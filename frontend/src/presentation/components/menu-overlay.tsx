import type React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  ArrowLeftRight,
  BadgeDollarSign,
  Wallet,
  FileText,
  Users,
  FileCheck2,
  SendHorizontal,
  TrendingUp,
  Calendar,
  Settings,
  PhoneCall,
  Phone,
  HelpCircle,
  PlayCircle,
  LogOut,
  Smartphone,
  Gift,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface MenuOption {
  icon: React.ElementType
  label: string
}

const favoriteOptions: MenuOption[] = [
  { icon: ArrowLeftRight, label: "Transferir" },
  { icon: BadgeDollarSign, label: "Préstamo" },
  { icon: Wallet, label: "Cambio de divisas" },
  { icon: FileText, label: "Estado de cuenta" },
]

const additionalOptions: MenuOption[] = [
  { icon: Users, label: "Mis cuentas" },
  { icon: FileCheck2, label: "Depósito de cheques" },
  { icon: SendHorizontal, label: "Retirar dinero" },
  { icon: TrendingUp, label: "Inversiones" },
  { icon: Calendar, label: "Calendario" },
  { icon: Settings, label: "Configuración" },
  { icon: Smartphone, label: "Recargas" },
  { icon: BadgeDollarSign, label: "Agregar a Apple wallet" },
  { icon: Gift, label: "Promociones" },
]

const supportOptions: MenuOption[] = [
  { icon: PhoneCall, label: "Llamar a soporte" },
  { icon: Phone, label: "Llamar a soporte" },
  { icon: HelpCircle, label: "Preguntas Frecuentes" },
  { icon: PlayCircle, label: "Tutorial" },
]

export function MenuOverlay() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <svg width="20" height="6" viewBox="0 0 20 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="3" cy="3" r="2" fill="#EC1C2D" />
              <circle cx="10" cy="3" r="2" fill="#EC1C2D" />
              <circle cx="17" cy="3" r="2" fill="#EC1C2D" />
            </svg>
          </div>
          <span className="text-xs text-center">Más</span>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 text-left border-b">
            <SheetTitle className="text-xl mb-1">Menú</SheetTitle>
            <p className="text-sm text-gray-600">Sergio Tirado</p>
            <p className="text-xs text-gray-500">Favoritos</p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            {/* Favorites Section */}
            <div className="grid grid-cols-4 gap-4 p-6 border-b">
              {favoriteOptions.map((option, index) => (
                <button key={index} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <option.icon className="w-6 h-6 text-banorte-red" />
                  </div>
                  <span className="text-xs text-center">{option.label}</span>
                </button>
              ))}
            </div>

            {/* Account Operations Section */}
            <div className="p-6 border-b">
              <h3 className="text-sm text-gray-500 mb-4">Operaciones con cuentas</h3>
              <div className="grid grid-cols-4 gap-4">
                {favoriteOptions.map((option, index) => (
                  <button key={index} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <option.icon className="w-6 h-6 text-banorte-red" />
                    </div>
                    <span className="text-xs text-center">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Options Grid */}
            <div className="grid grid-cols-4 gap-4 p-6 border-b">
              {additionalOptions.map((option, index) => (
                <button key={index} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <option.icon className="w-6 h-6 text-banorte-red" />
                  </div>
                  <span className="text-xs text-center">{option.label}</span>
                </button>
              ))}
            </div>

            {/* Support Section */}
            <div className="p-6">
              <h3 className="text-sm text-gray-500 mb-4">Soporte</h3>
              <div className="grid grid-cols-4 gap-4">
                {supportOptions.map((option, index) => (
                  <button key={index} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <option.icon className="w-6 h-6 text-banorte-red" />
                    </div>
                    <span className="text-xs text-center">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-6 border-t mt-auto">
            <Button
              className="w-full bg-banorte-red hover:bg-banorte-red/90 text-white"
              onClick={() => console.log("Logout")}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

