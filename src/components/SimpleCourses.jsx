import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'

const SimpleCourses = () => {
  console.log('SimpleCourses rendering')
  
  return (
    <section id="courses" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Nasze kursy językowe
          </h2>
          <p className="text-xl text-slate-600">
            Wybierz język, który chcesz opanować
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🇬🇧</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Angielski</h3>
              <p className="text-slate-600 mb-4">Język międzynarodowej komunikacji</p>
              <div className="text-3xl font-bold text-blue-600 mb-4">199 zł</div>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                Zobacz szczegóły
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🇫🇷</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Francuski</h3>
              <p className="text-slate-600 mb-4">Język kultury i dyplomacji</p>
              <div className="text-3xl font-bold text-purple-600 mb-4">199 zł</div>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                Zobacz szczegóły
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🇩🇪</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Niemiecki</h3>
              <p className="text-slate-600 mb-4">Język największej gospodarki Europy</p>
              <div className="text-3xl font-bold text-orange-600 mb-4">199 zł</div>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white">
                Zobacz szczegóły
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default SimpleCourses