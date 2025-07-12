import { User } from "lucide-react";
import SkillTag from "./SkillTag";
import { UserType } from "@/lib/types";

function UserCard({ user }: { user: UserType }) {
  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {user.name}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-emerald-400 text-sm font-medium">
                  Skills Offered →
                </span>
                <div className="flex space-x-2">
                  {user.skillsOffered.map((skill: string, index: number) => (
                    <SkillTag key={index} skill={skill} type="offered" />
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400 text-sm font-medium">
                  Skills Wanted →
                </span>
                <div className="flex space-x-2">
                  {user.skillsWanted.map((skill: string, index: number) => (
                    <SkillTag key={index} skill={skill} type="wanted" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-3">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Request
          </button>
          <div className="text-right">
            <div className="text-gray-400 text-sm">Rating</div>
            <div className="text-white font-semibold">{user.rating}/5</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
