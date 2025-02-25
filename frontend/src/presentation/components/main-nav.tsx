import { Settings, BarChart2, MonitorPlay, Calendar, Headphones, HelpCircle } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

const menuItems = [
  {
    icon: Settings,
    label: "Configuracion",
  },
  {
    icon: BarChart2,
    label: "Indicadores Financieros",
  },
  {
    icon: MonitorPlay,
    label: "Tutorial",
  },
  {
    icon: Calendar,
    label: "Calendario",
  },
  {
    icon: Headphones,
    label: "Suporte virtual",
  },
  {
    icon: HelpCircle,
    label: "FAQ",
  },
]

export function MainNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-transparent">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-white p-0 z-50">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h2 className="text-xl font-semibold">Sergio Tirado</h2>
          </div>
          <nav className="flex-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="flex items-center w-full px-6 py-4 text-left hover:bg-red-50 transition-colors"
              >
                <item.icon className="w-6 h-6 text-banorte-red mr-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

