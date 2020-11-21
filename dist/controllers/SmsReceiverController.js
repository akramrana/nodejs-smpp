"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsReceiverController = void 0;
const routing_controllers_1 = require("routing-controllers");
const TblInbox_1 = require("../models/TblInbox");
const typeorm_1 = require("typeorm");
const TblInboxPost_1 = require("..//models/TblInboxPost");
const TblOutbox_1 = require("../models/TblOutbox");
const smpp = require('smpp');
let SmsReceiverController = class SmsReceiverController {
    constructor() { }
    receive7171(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = [];
            let connected = false;
            let session = smpp.connect('smpp://203.223.93.69:5012');
            session.on('connect', function () {
                connected = true;
                session.bind_transceiver({
                    system_id: 'imedi',
                    password: 'imedi'
                }, function (pdu) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (pdu.command_status === 0) {
                            connected = true;
                            console.log('Successfully bound transceiver.');
                            //
                            const outboxModels = yield typeorm_1.getRepository(TblOutbox_1.TblOutbox)
                                .createQueryBuilder("tbl_outbox")
                                .where("(telco_CPshortCode LIKE '27171%') AND (telco_msgOption = 0) AND (msg_status=-128 OR msg_status=88 OR msg_status=-1) AND (telco_msgBody IS NOT NULL)")
                                .getMany();
                            if (outboxModels.length > 0) {
                                for (const om of outboxModels) {
                                    //console.log(om);
                                    let telcoMsgBody = om.telcoMsgBody;
                                    telcoMsgBody = telcoMsgBody.replace(/'/g, "");
                                    telcoMsgBody = telcoMsgBody.replace(/"/g, "");
                                    let text = telcoMsgBody.substring(0, 255);
                                    let from = '+' + om.telcoCPshortCode;
                                    let to = '+' + om.telcoToMobileNo;
                                    //
                                    try {
                                        session.submit_sm({
                                            source_addr: from,
                                            destination_addr: to,
                                            message_payload: text
                                        }, function (respose) {
                                            return __awaiter(this, void 0, void 0, function* () {
                                                console.log('sms pdu status', respose.command_status);
                                                if (respose.command_status == 0) {
                                                    // Message successfully sent
                                                    console.log(respose.message_id);
                                                    //
                                                    yield typeorm_1.getRepository(TblOutbox_1.TblOutbox).update(om.outboxId, {
                                                        msgStatus: 0
                                                    });
                                                }
                                            });
                                        });
                                    }
                                    catch (err) {
                                        console.log(err);
                                    }
                                }
                            }
                            //
                        }
                    });
                });
            });
            session.on('close', function () {
                console.log('smpp disconnected');
                if (connected) {
                    session.connect();
                }
            });
            session.on('error', function (error) {
                console.log('smpp error', error);
                connected = false;
            });
            session.on('pdu', function (pdu) {
                return __awaiter(this, void 0, void 0, function* () {
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
                            const inbox = new TblInbox_1.TblInbox();
                            var datetime = new Date();
                            inbox.telcoMsgId = String(rand);
                            inbox.telcoCPshortCode = pdu.destination_addr;
                            inbox.telcoInMobileNo = pdu.source_addr;
                            inbox.telcoMsgBody = message;
                            inbox.enabled = true;
                            inbox.creationTime = datetime;
                            const modelSave = yield typeorm_1.getRepository(TblInbox_1.TblInbox).save(inbox);
                            //
                            if (modelSave) {
                                // Reply to SMSC that we received and processed the SMS
                                session.deliver_sm_resp({ sequence_number: pdu.sequence_number });
                                try {
                                    const inboxPost = new TblInboxPost_1.TblInboxPost();
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
                                    yield typeorm_1.getRepository(TblInboxPost_1.TblInboxPost).save(inboxPost);
                                    //
                                }
                                catch (err) {
                                    console.log("Inbox Post Error:" + err);
                                }
                            }
                            session.close();
                        }
                    }
                    catch (err) {
                        console.log(err);
                    }
                });
            });
            const inboxModels = yield typeorm_1.getRepository(TblInbox_1.TblInbox)
                .createQueryBuilder("tbl_inbox")
                .where("tbl_inbox.telco_CPshortCode = '27171' OR tbl_inbox.telco_CPshortCode = '7171'")
                .limit(10)
                .orderBy({
                "tbl_inbox.creation_time": "DESC",
            })
                .getMany();
            if (inboxModels.length > 0) {
                for (const model of inboxModels) {
                    let d = {
                        time_stamp: model.creationTime,
                        telco_inMobileNo: model.telcoInMobileNo,
                        telco_CPshortCode: model.telcoCPshortCode,
                        telco_msgBody: model.telcoMsgBody,
                        telco_msgValidity: (model.telcoMsgValidity) ? model.telcoMsgValidity : "",
                    };
                    data.push(d);
                }
            }
            const successResponse = {
                status: 200,
                message: '',
                data: data
            };
            return response.status(200).send(successResponse);
        });
    }
};
__decorate([
    routing_controllers_1.Get('/receive7171'),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SmsReceiverController.prototype, "receive7171", null);
SmsReceiverController = __decorate([
    routing_controllers_1.JsonController('/sms-receiver'),
    __metadata("design:paramtypes", [])
], SmsReceiverController);
exports.SmsReceiverController = SmsReceiverController;
//# sourceMappingURL=SmsReceiverController.js.map