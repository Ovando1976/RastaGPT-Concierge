export default function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="section">
      <h3>{icon} {title}</h3>
      <div className="hr" />
    </div>
  );
}