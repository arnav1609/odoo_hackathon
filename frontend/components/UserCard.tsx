import { User } from "lucide-react";
import SkillTag from "./SkillTag";
import { UserType } from "@/lib/types";
import Link from "next/link";

function UserCard({ user }: { user: UserType }) {
  return (
    <Link href={`/${user.id}`}>
      <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-4 sm:p-6 backdrop-blur-sm hover:bg-gray-800/50 transition">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Left Side: Avatar + Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center shrink-0">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                {user.name}
              </h3>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-emerald-400 text-sm font-medium">
                    Skills Offered →
                  </span>
                  {user.skillsOffered.map((skill, index) => (
                    <SkillTag key={index} skill={skill} type="offered" />
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-blue-400 text-sm font-medium">
                    Skills Wanted →
                  </span>
                  {user.skillsWanted.map((skill, index) => (
                    <SkillTag key={index} skill={skill} type="wanted" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Actions */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:space-y-3 w-full sm:w-auto">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 mx-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto">
              Request
            </button>
            <div className="text-right text-sm">
              <div className="text-gray-400">Rating</div>
              <div className="text-white font-semibold">{user.rating}/5</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default UserCard;
