import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) { // if it is not an image file, show error toast
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        };
    };

    const handleSendMessage = async (e) => {
        e.preventDefault(); // no page refresh
        if (!text.trim() && !imagePreview) return; // do not send if there is no text and no image

        try {
            await sendMessage({ // send message to backend
                text: text.trim(),
                image: imagePreview,
            });

            // Clear form
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <div className="p-4 w-full">
            {imagePreview && ( // Show image preview if there is an image
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button // Button to remove the image 
                        onClick={removeImage}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
                        flex items-center justify-center"
                        type="button"
                        >
                            <X className="size-3" /> {/* X close icon */}
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input // input for text message
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input // input for file
                        type="file"
                        accept="image/*"
                        className="hidden" // hidden by default when click button below, it will trigger this input
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle
                                ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} /> {/* Image icon from lucide-react */}
                    </button>
                </div>
                <button
                type="submit"
                className="btn btn-sm btn-circle"
                disabled={!text.trim() && !imagePreview} // disabled if there is no text or no image
                >
                    <Send size={22} /> {/* Send icon from lucide-react */}
                </button>
            </form>
        </div>
    );
};
export default MessageInput;