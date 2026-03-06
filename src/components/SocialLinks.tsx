
import { Linkedin, Github } from 'lucide-react';

export function SocialLinks() {
  return (
    <footer className="mt-auto py-16 px-6 flex flex-col items-center gap-10 border-t bg-white/20 backdrop-blur-lg">
      <div className="text-center space-y-2">
        <p className="text-muted-foreground/70 text-sm font-bold uppercase tracking-widest">تم التطوير بواسطة</p>
        <h3 className="text-2xl md:text-3xl font-black text-primary">محمود البحراني</h3>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6">
        <a
          href="https://www.linkedin.com/in/mahmoudbahrani/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-8 py-4 bg-[#0077b5] text-white rounded-[1.5rem] font-bold transition-all hover:scale-110 hover:shadow-[0_20px_40px_-15px_rgba(0,119,181,0.5)] active:scale-95 group shadow-lg"
        >
          <div className="bg-white/10 p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Linkedin className="w-6 h-6" />
          </div>
          <span className="text-lg">LinkedIn</span>
        </a>
        
        <a
          href="https://github.com/Mahmoud5150"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-8 py-4 bg-[#1a1c1e] text-white rounded-[1.5rem] font-bold transition-all hover:scale-110 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] active:scale-95 group shadow-lg"
        >
          <div className="bg-white/10 p-2 rounded-lg group-hover:-rotate-12 transition-transform">
            <Github className="w-6 h-6" />
          </div>
          <span className="text-lg">GitHub</span>
        </a>
      </div>
    </footer>
  );
}
