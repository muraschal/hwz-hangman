import HangmanGame from '@/components/game/HangmanGame';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-slate-200 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="absolute -top-40 -left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -top-40 -right-20 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        
        <HangmanGame />
        
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>Entwickelt für die HWZ - Hochschule für Wirtschaft Zürich | Executive MBA Programm</p>
        </footer>
      </div>
    </main>
  );
}
