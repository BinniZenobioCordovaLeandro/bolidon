import demoEn from "./demo-en"

const en = {
  common: {
    ok: "OK!",
    cancel: "Cancelar",
    back: "Atras",
    logOut: "Cerrar sesión",
  },
  welcomeScreen: {
    postscript: "Pisa a fondo y disfruta del viaje.",
    readyForLaunch: "¡Listo para convertir tu vehiculo en un BOLIDON!",
    feat1Title: "Diagnóstico Inteligente con IA",
    feat1Desc: "Identifica problemas en tu coche con ayuda de inteligencia artificial para un diagnóstico más rápido y preciso.",
    feat2Title: "Recordatorios y Citas de Reparación",
    feat2Desc: "No pierdas de vista los servicios importantes y solicita citas de reparación en tu taller de confianza directamente desde la app.",
    feat3Title: "Historial Completo de Servicios",
    feat3Desc: "Lleva un registro organizado de todos los mantenimientos para mantener tu coche siempre en óptimas condiciones y facilitar futuras reparaciones.",
    exciting: "¡Esto va a ser emocionante!",
    letsGo: "¡Vamos causa!",
  },
  CollaboratorWelcomeScreen: {
    postscript: "Brinda el mejor servicio a tus clientes.",
    readyForLaunch: "¡Listo para brindar el mejor servicio!",
    exciting: "¡Esto va a ser emocionante!",
    letsGo: "¡Vamos causa!",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  PhotoGalleryComponent: {
    addPhoto: "Add photo",
  },
  VideoGalleryComponent: {
    addVideo: "Add video",
  },
  errors: {
    invalidEmail: "Invalid email address.",
  },
  loginScreen: {
    register: "Registrame",
    logIn: "Log In",
    enterDetails:
      "Ingresa tu correo y contraseña para acceder a tu cuenta. Si no tienes una cuenta, puedes crear una.",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Ingresa tu correo",
    passwordFieldPlaceholder: "Ingresa tu contraseña",
    tapToLogIn: "Ingresar",
    or: "tamien puedes usar tus redes sociales:",
    tapToLogInWithGoogle: "Ingresar con Google",
    tapToLogInWithFacebook: "Ingresar con Facebook",
    hint: "Puedes usar tu correo y contraseña o tus redes sociales para ingresar.",
  },
  registerScreen: {
    register: "Registrate",
    enterDetails:
      "Ingresa tu correo y contraseña para crear tu cuenta. Si ya tienes una cuenta, puedes ingresar.",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    confirmPasswordFieldLabel: "Confirm Password",
    emailFieldPlaceholder: "Ingresa tu correo",
    passwordFieldPlaceholder: "Ingresa tu contraseña",
    confirmPasswordFieldPlaceholder: "Confirma tu contraseña",
    tapToRegister: "Registrame",
  },
  demoNavigator: {
    HomeTab: "Bolidon",
    componentsTab: "Components",
    debugTab: "Perfil",
    podcastListTab: "Ordenes de Servicio",
  },
  collaboratorNavigator: {
    podcastListTab: "Ordenes de Servicio",
    vehiclesTab: "Vehiculos",
    profileTab: "Perfil",
  },
  HomeScreen: {
    title: "Tu vehiculo es un BOLIDON",
    tagLine:
      "Manten tu vehiculo en optimas condiciones, con los mejores productos y servicios del mercado.",
    offers: "Tienes ofertas",
    serviceOrder: "Tienes orden de servicio",
    diagnosticAI: "Iniciar diagnostico con IA",
    repair: "Reparar vehiculo",
  },
  ComponentsScreen: {
    jumpStart: "Tus componentes",
  },
  NewVehicleScreen: {
    title: "Registra tu vehiculo",
    plateFieldLabel: "Placa",
    plateFieldPlaceholder: "Ingresa la placa de tu vehiculo",
    modelFieldLabel: "Modelo",
    modelFieldPlaceholder: "Ingresa el modelo de tu vehiculo",
    brandFieldLabel: "Marca",
    brandFieldPlaceholder: "Ingresa la marca de tu vehiculo",
    yearFieldLabel: "Año",
    yearFieldPlaceholder: "Ingresa el año de tu vehiculo",
    colorFieldLabel: "Color",
    colorFieldPlaceholder: "Ingresa el color de tu vehiculo",
    kilometersFieldLabel: "Kilometraje",
    kilometersFieldPlaceholder: "Ingresa el kilometraje de tu vehiculo",
    engineFieldLabel: "Motor",
    engineFieldPlaceholder: "Ingresa el motor de tu vehiculo",
    transmissionFieldLabel: "Transmision",
    transmissionFieldPlaceholder: "Ingresa la transmision de tu vehiculo",
    photosTitle: "Fotos de tu vehiculo",
    photosAdd: "Agregar fotos",
    submitButton: "Registrar vehiculo",
  },
  VehiclesScreen: {
    title: "Vehiculos",
    selectVehicle: "Selecciona tu vehiculo",
    noVehicles: "No tienes vehiculos registrados",
    addVehicle: "Agregar vehiculo",
    addVehicleHint: "Agrega un vehiculo para comenzar a disfrutar de los servicios de Bolidon.",
    onlyFavorites: "Mostrar solo favoritos",
    filterVehicle: "Filtrar vehiculo",
    accessibility: {
      cardHint:
        "Double tap to listen to the episode. Double tap and hold to {{action}} this episode.",
      switch: "Switch on to only show favorites",
      favoriteAction: "Toggle Favorite",
      favoriteIcon: "Episode not favorited",
      unfavoriteIcon: "Episode favorited",
      publishLabel: "Published {{date}}",
      durationLabel: "Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds",
    },
    noFavoritesEmptyState: {
      heading: "This looks a bit empty",
      content:
        "No favorites have been added yet. Tap the heart on an episode to add it to your favorites!",
    },
  },
  NewOrderServiceScreen: {
    title: "Nueva orden de servicio",
    kilometersFieldLabel: "Kilometros actuales",
    kilometersFieldPlaceholder: "Ingresa los kilometros actuales",
    titleFieldLabel: "LUGAR del servicio",
    titleFieldPlaceholder: "Ejemplo: Transmision, Frenos, Motor, etc.",
    subtitleFieldLabel: "Descripcion",
    subtitleFieldPlaceholder: "Ingresa una descripcion del servicio",
    componentsCardTitle: "Lista de componentes para el servicio",
    componentsCardDescription: "Ingresa los componentes que deseas revisar o cambiar en tu vehiculo.",
    componentFieldLabel: "Componente",
    componentFieldPlaceholder: "Ingresa el componente",
    urgencyLevelFieldLabel: "¿Es urgente cambiar este componente?",
    addOtherComponent: "Agregar otro componente",
    priceFieldLabel: "Precio aproximado",
    priceFieldPlaceholder: "Ingresa el precio del servicio",
    photosTitle: "Fotos de tu vehiculo",
    photosAdd: "Agregar fotos",
    photosFieldLabel: "Fotos",
    photosFieldPlaceholder: "Agrega fotos del problema",
    termsAndConditions: "Acepto los terminos y condiciones",
    submitButton: "Registrar orden de servicio",
  },
  OffersScreen: {
    title: "Ofertas",
    description: "Aprovecha las ofertas y promociones de nuestros talleres aliados.",
  },
  AssistedDiagnosisScreen: {
    title: "Diagnostica con Inteligencia Artificial",
    kilometersFieldLabel: "Kilometros actuales",
    kilometersFieldPlaceholder: "Ingresa los kilometros actuales",
    descriptionFieldLabel: "Describe el problema",
    descriptionFieldPlaceholder: "Ingresa una descripcion detallada del problema",
    photosTitle: "Fotos del problema",
    photosAdd: "Agregar fotos",
    videoTitle: "Video del problema",
    videoAdd: "Agregar video",
    submitButton: "Inteligencia artificial, ayudame!",
  },
  RepairRequestScreen: {
    title: "Quiero una cita para reparar mi vehiculo",
    kilometersFieldLabel: "Kilometros actuales",
    kilometersFieldPlaceholder: "Ingresa los kilometros actuales",
    descriptionFieldLabel: "Describe el problema",
    descriptionFieldPlaceholder: "Ingresa una descripcion detallada del problema",
    termsAndConditions: "Acepto los terminos y condiciones",
    submitButton: "Enviame una cita",
  },
  ProfileScreen: {
    title: "Perfil",
    reportBugs: "Reportar errores",
    suggestFeature: "Enviar Sugerencias",
    profile: "Editar perfil",
    publicOffer: "Crear oferta publica",
    joinUs: "Tienes taller?, Brindas servicio a vehiculos?, Unete a nuestro equipo",
  },
  demoDebugScreen: {
    howTo: "HOW TO",
    title: "Debug",
    tagLine:
      "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
    reactotron: "Send to Reactotron",
    reportBugs: "Report Bugs",
    demoList: "Demo List",
    demoPodcastList: "Demo Podcast List",
    androidReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
    iosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    macosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    webReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    windowsReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  },
  demoPodcastListScreen: {
    title: "Ordenes de Servicio",
    onlyFavorites: "Mostrar solo favoritos",
    favoriteButton: "Favorite",
    unfavoriteButton: "Unfavorite",
    accessibility: {
      cardHint:
        "Double tap to listen to the episode. Double tap and hold to {{action}} this episode.",
      switch: "Switch on to only show favorites",
      favoriteAction: "Toggle Favorite",
      favoriteIcon: "Episode not favorited",
      unfavoriteIcon: "Episode favorited",
      publishLabel: "Published {{date}}",
      durationLabel: "Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds",
    },
    noFavoritesEmptyState: {
      heading: "This looks a bit empty",
      content:
        "No favorites have been added yet. Tap the heart on an episode to add it to your favorites!",
    },
  },

  ...demoEn,
}

export default en
export type Translations = typeof en
