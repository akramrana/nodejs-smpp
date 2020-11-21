import {
    Body,
    Delete,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    QueryParam,
    Req,
    Res,
    UseBefore
} from "routing-controllers";
import { TblInbox } from "../models/TblInbox";
import { getRepository } from "typeorm";
import { TblInboxPost } from "..//models/TblInboxPost";
import { TblOutbox } from "../models/TblOutbox";

const smpp = require('smpp');

@JsonController('/sms-receiver')
export class SmsReceiverController {

    constructor() { }

    @Get('/receive7171')
    async receive7171(@Req() request: any, @Res() response: any) {
        let data:any = [];
        let connected = false;
        let session = smpp.connect('smpp://203.223.93.69:5012');
        session.on('connect', function () {
            connected = true;
            session.bind_transceiver({
                system_id: 'imedi',
                password: 'imedi'
            }, async function (pdu: any) {
                //console.log(pdu.command_status);
                const outboxModels = await getRepository(TblOutbox)
                    .createQueryBuilder("tbl_outbox")
                    .where("(telco_CPshortCode LIKE '27171%') AND (telco_msgOption = 0) AND (msg_status=-128 OR msg_status=88 OR msg_status=-1) AND (telco_msgBody IS NOT NULL)")
                    .getMany();
                if (outboxModels.length > 0) {
                    for (const om of outboxModels) {
                        //console.log(om);
                        let telcoMsgBody:any = om.telcoMsgBody;
                        telcoMsgBody = telcoMsgBody.replace(/'/g,"");
                        telcoMsgBody = telcoMsgBody.replace(/"/g,""); 

                        let text:any = telcoMsgBody.substring(0,255);
                        let from = '+' + om.telcoCPshortCode;
                        let to = '+' + om.telcoToMobileNo;
                        //
                        try {
                            session.submit_sm({
                                source_addr: from,
                                destination_addr: to,
                                message_payload: text
                            }, async function (respose:any) {
                                console.log('sms pdu status', respose.command_status);
                                if (respose.command_status == 0) {
                                    // Message successfully sent
                                    console.log(respose.message_id);
                                    //
                                    await getRepository(TblOutbox).update(om.outboxId, {
                                        msgStatus: 0
                                    });
                                }
                            });
                        }catch (err) {
                            console.log(err);
                        }
                    }
                }
                //
                if (pdu.command_status === 0) {
                    connected = true;
                    console.log('Successfully bound transceiver.');
                }
            }); 
        });
        session.on('close', function () {
            console.log('smpp disconnected')
            if (connected) {
                session.connect();
            }
        });
        session.on('error', function (error: any) {
            console.log('smpp error', error)
            connected = false;
        });
        session.on('pdu', async function (pdu: any) {
            try {
                if (pdu.command == 'data_sm') {
                    var sms = {
                        from: null,
                        to: null,
                        message: null
                    };
                    sms.from = pdu.source_addr.toString();
                    sms.to = pdu.destination_addr.toString();
                    if (pdu.message_payload) {
                        sms.message = pdu.message_payload.message;
                    }
                    session.deliver_sm_resp({
                        sequence_number: pdu.sequence_number
                    });

                }
                if (pdu.command == 'deliver_sm') {
                    //console.log(pdu);
                    var fromNumber = pdu.source_addr.toString();
                    var toNumber = pdu.destination_addr.toString();
                    var text = '';
                    if (pdu.short_message && pdu.short_message.message) {
                      text = pdu.short_message.message;
                    }
                    console.log('SMS ' + fromNumber + ' -> ' + toNumber + ': ' + text);

                    let message = pdu.short_message.message;
                    let msgArray = message.split(" ");
                    let rand = Math.floor(Math.random() * 111199991199);
                    const inbox = new TblInbox();
                    var datetime = new Date();
                    inbox.telcoMsgId = String(rand);
                    inbox.telcoCPshortCode = pdu.destination_addr;
                    inbox.telcoInMobileNo = pdu.source_addr;
                    inbox.telcoMsgBody = message;
                    inbox.enabled = true;
                    inbox.creationTime = datetime;
                    const modelSave = await getRepository(TblInbox).save(inbox);
                    //
                    if (modelSave) {
                        // Reply to SMSC that we received and processed the SMS
                        session.deliver_sm_resp({ sequence_number: pdu.sequence_number });
                        try {
                            const inboxPost = new TblInboxPost();
                            inboxPost.inboxId = inbox.inboxId;
                            inboxPost.telcoMsgId = String(rand);
                            inboxPost.telcoCPshortCode = inbox.telcoCPshortCode;
                            inboxPost.telcoInMobileNo = inbox.telcoInMobileNo;
                            inboxPost.telcoMsgBody = message;
                            inboxPost.msgKeyword = msgArray[0];
                            inboxPost.msgParameter_1 = (msgArray[1]) ? msgArray[1] : "";
                            inboxPost.msgParameter_2 = (msgArray[2]) ? msgArray[2] : "";
                            inboxPost.msgParameter_3 = (msgArray[3]) ? msgArray[3] : "";
                            inboxPost.creationTime = datetime;
                            await getRepository(TblInboxPost).save(inboxPost);
                            //
                        }catch (err) {
                            console.log("Inbox Post Error:"+err);
                        }
                    }
                    session.close();

                }
            } catch (err) {
                console.log(err);
            }
        });

        const inboxModels = await getRepository(TblInbox)
            .createQueryBuilder("tbl_inbox")
            .where("tbl_inbox.telco_CPshortCode = '27171' OR tbl_inbox.telco_CPshortCode = '7171'")
            .limit(10)
            .orderBy({
                "tbl_inbox.creation_time":"DESC",
            })
            .getMany();

        if(inboxModels.length > 0){
            for(const model of inboxModels){
                let d ={
                    time_stamp:model.creationTime,
                    telco_inMobileNo:model.telcoInMobileNo,
                    telco_CPshortCode:model.telcoCPshortCode,
                    telco_msgBody:model.telcoMsgBody,
                    telco_msgValidity:(model.telcoMsgValidity)?model.telcoMsgValidity:"",
                }
                data.push(d);
            }
        }
        
        const successResponse: any = {
            status: 200,
            message: '',
            data: data
        };
        return response.status(200).send(successResponse);
    }

}