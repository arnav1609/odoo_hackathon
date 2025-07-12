function SkillTag({ skill, type }: { skill: string; type: string }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        type === "offered"
          ? "bg-emerald-900/30 text-emerald-400 border border-emerald-700"
          : "bg-blue-900/30 text-blue-400 border border-blue-700"
      }`}
    >
      {skill}
    </span>
  );
}
export default SkillTag;
