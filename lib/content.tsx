export type Entry = { slug:string; title:string; number?:string; subtitle?:string; status?:string; year?:string; date?:string; category?:string; description:string; topics:string[]; body:string };

function parse(file:string, raw:string): Entry {
  const [,head="",body=raw]=raw.split(/^---\s*$/m);
  const meta=Object.fromEntries(head.trim().split("\n").filter(Boolean).map((line)=>{const i=line.indexOf(":");return [line.slice(0,i).trim(),line.slice(i+1).trim()]}));
  return { slug:file.split("/").pop()!.replace(".md",""), title:meta.title||"Untitled", number:meta.number, subtitle:meta.subtitle, status:meta.status, year:meta.year, date:meta.date, category:meta.category, description:meta.description||"", topics:meta.topics?.split(",").map((x:string)=>x.trim())||[], body:body.trim() };
}
const projectFiles=import.meta.glob("../content/projects/*.md",{query:"?raw",import:"default",eager:true}) as Record<string,string>;
const analysisFiles=import.meta.glob("../content/analysis/*.md",{query:"?raw",import:"default",eager:true}) as Record<string,string>;
function all(files:Record<string,string>){return Object.entries(files).map(([file,raw])=>parse(file,raw));}
export const getProjects=()=>all(projectFiles).sort((a,b)=>(a.number||"").localeCompare(b.number||""));
export const getProject=(slug:string)=>getProjects().find(p=>p.slug===slug);
export const getAnalysis=()=>all(analysisFiles).sort((a,b)=>(b.date||"").localeCompare(a.date||""));

export function Markdown({body}:{body:string}) {
  const nodes:React.ReactNode[]=[]; let list:string[]=[];
  const flush=()=>{if(list.length){nodes.push(<ul key={`ul-${nodes.length}`}>{list.map((x,i)=><li key={i}>{x}</li>)}</ul>);list=[]}};
  body.split("\n").forEach((line)=>{if(line.startsWith("- ")){list.push(line.slice(2));return}flush();if(!line.trim())return;if(line.startsWith("## "))nodes.push(<h2 key={nodes.length}>{line.slice(3)}</h2>);else if(line.startsWith("> "))nodes.push(<aside key={nodes.length}>{line.slice(2)}</aside>);else nodes.push(<p key={nodes.length}>{line}</p>)});flush(); return <div className="prose">{nodes}</div>;
}
