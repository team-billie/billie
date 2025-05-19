import React, { KeyboardEvent, ChangeEvent } from "react";
import { Send, Plus } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  value,
  onChange,
  onKeyDown,
  placeholder = "메시지를 입력해 주세요",
  disabled = false,
  className = "",
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (value.trim() === "" || disabled) return;

    onSendMessage(value.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-3 bg-white border-t ${className}`}
    >
      <div className="flex items-center">
        {/* <button
          type="button"
          className="p-2 mr-2 text-gray-500 bg-gray-100 rounded-full flex-shrink-0 hover:bg-gray-200 transition-colors"
          aria-label="추가 옵션"
        >
          <Plus size={22} />
        </button> */}

        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 p-3 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />

        <button
          type="submit"
          className={`p-2 ml-2 rounded-full flex-shrink-0 transition-colors ${
            value.trim()
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-100 text-gray-400"
          }`}
          disabled={value.trim() === "" || disabled}
          aria-label="메시지 보내기"
        >
          <Send size={22} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
