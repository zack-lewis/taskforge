export default function ProjectLogo({ name }: { name: string }) {
  const n = name.split(" ");
  let initials = [];
  if (n.length > 1) {
    n.map((v) => initials.push(v.charAt(0)));
  } else {
    initials.push(n[0].charAt(0));
  }

  const finalString = initials.join(" ");

  return (
    <div className="w-full h-full text-9xl text-center font-extrabold align-middle uppercase">
      {finalString}
    </div>
  );
}
