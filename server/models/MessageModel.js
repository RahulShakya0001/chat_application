import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: false
    },
    messageTypes: {
        type: String,
        enum: ["text", "file"],
        required: true,
    },
    content: {
        type: String,
        required: function () {
            return this.messageTypes === "text"
        }
    },
    fileUrl: {
        type: String,
        required: function(){
            return this.messageTypes === "file"
        }
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model("Messages", messageSchema);
export default Message;