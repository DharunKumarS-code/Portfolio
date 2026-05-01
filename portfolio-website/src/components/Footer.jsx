import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
          Built with <Heart size={14} className="text-red-500 fill-red-500" /> by <span className="font-semibold text-gray-900 dark:text-white ml-1">Dharun Kumar</span>
        </p>

        <div className="flex gap-4">
          <a href="https://github.com/DharunKumarS-code" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-110">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/dharun-kumar-8504a4290" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-110">
            <Linkedin size={20} />
          </a>
          <a href="mailto:sdharun7010@gmail.com" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-110">
            <Mail size={20} />
          </a>
        </div>

        <p className="text-gray-500 dark:text-gray-500 text-sm">© {new Date().getFullYear()} Dharun Kumar</p>
      </div>
    </footer>
  )
}
