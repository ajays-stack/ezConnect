import { MessageCircle } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center mb-6">
          <div
            className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center
              shadow-lg shadow-primary/30 animate-pulse"
          >
            <MessageCircle className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-extrabold text-primary">Welcome to ezConnect!</h2>
        <p className="text-base-content/70 text-lg">
          Select a conversation from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
