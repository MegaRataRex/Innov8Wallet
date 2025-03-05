# Innov8 Wallet

![Logo](https://github.com/MegaRataRex/Innov8Wallet/blob/main/icon.png?raw=true)

El presente proyecto es el prototipo funcional basado en el proyecto de figma. Esta aplicación pretende conectar la lógica que está desplegada en el servidor, en la dirección

https://continual-rhino-451822-t8.uw.r.appspot.com/

Para probar el proyecto, los requerimientos son los siguientes:

1. Descargar Android Studio, el cual viene incluido con un emulador. Asegurarse de incluir las variables de entorno ANDROID_HOME en el sistema. Más detalles para establecer el entorno vienen en: https://reactnative.dev/docs/set-up-your-environment

2. Instalar Java 17 Development Kit. Cualquier otra versión puede fallar. Java 17 JDK se encuentra en: https://adoptium.net/es/temurin/releases/?os=windows&package=jdk&version=17 . En la instalación, incluir la variable de entorno JAVA_HOME, la cual es una de las opciones de instalación.

3. Asegurarse de tener instalado NodeJS, este se encuentra en: https://nodejs.org/en

4. Abrir la terminal o un editor de código con terminal en la carpeta ./frontend del proyecto. para acceder a esta correr el comando cd ./frontend.

5. correr el comando npm install.

6. correr el comando npm run android. Se abrirá un emulador de Android y se correrá la aplicación, una vez se termine de instalar en el teléfono. Esto puede tomar un tiempo.

Finalmente, al tener abierta la aplicación. Iniciar sesión con la cuenta de prueba:

Usuario:
santybel.1@hotmail.com (se tiene que usar el teclado del teléfono para escribir la @)
![alt text](https://github.com/MegaRataRex/Innov8Wallet/blob/main/app_pass.PNG?raw=true)

Dar click en Sig.
![alt text](https://github.com/MegaRataRex/Innov8Wallet/blob/main/next.PNG?raw=true)

Contraseña: SaTB-0806

Listo!

también puedes registrar un usuario realizando una petición http POST en postman en:

con el formato:

{
name: "tu_nombre",
email: "tu_correo",
password: "contraseña"
}

https://continual-rhino-451822-t8.uw.r.appspot.com/users/register

Listo! se pueden probar el resto de las funciones en el backend, sin embargo es un prototipo con las funciones básicas y con una base de datos escalable.
