const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowReclamosOSoporte = addKeyword(['soporte','reclamo','2']).addAnswer(['Espera un momento… ⚠',])

const flowOtroservicio= addKeyword(['otro','servicio','3']).addAnswer(['Por favor describe tu caso brevemente para brindarte una solución adecuada según la infracción que hayas cometido o que problema has tenido, en un momento un asesor se comunicara contigo.'])

const flowNogracias = addKeyword(['no','No gracias']).addAnswer(['Déjanos saber porque no te interesa o si tienes alguna duda o inquietud en la que te podamos colaborar.'])

const flowSideseoiniciar = addKeyword(['Si, deseo iniciar','si','iniciar']).addAnswer(
    [
        'Ingresa tu número de cédula para consultar tus infracciones de tránsito y, en un momento, un asesor se comunicará contigo para informarte sobre el valor de tu gestión.',
        'Tu número de ticket es *0024136*.',
    ]
    )
const flowCambiodeestadodelicencia = addKeyword(['licencia','cambio','estado']).addAnswer(
    [
        'En nuestro servicio de Cambio de Estado de Licencia, nos ocupamos de facilitar y agilizar el proceso de actualización de tu licencia de conducir. Ya sea para eliminar suspensiones u otros inconvenientes, nuestro equipo especializado está listo para ayudarte. Nos encargamos de todos los trámites, ofreciendo un proceso rápido y confiable para que puedas tener la tranquilidad de saber que tu licencia está en orden y lista para cualquier situación en la carretera. Déjanos cuidar de los detalles, para que tú sigas adelante con confianza y seguridad.',
        'Políticas de nuestro servicio de Cambio de Estado de Licencia:',
        'El cambio de estado de la licencia tiene un tiempo estimado de 1 día hábil, o menos, dependiendo de la complejidad del registro de la infracción.',
        'Es importante aclarar que, para iniciar con el servicio, deberás contar con el saldo suficiente para cubrir el costo del mismo.'
    ]
    )
 .addAnswer([
        '¿Deseas realizar el servicio?',
        '*Escribe la opción en palabra como se muestra, “no números”.*',
        '-Si, deseo iniciar',
        '-No gracias',
    ],
    null,
    null,
    [flowSideseoiniciar, flowNogracias]
    )

const flowMultasycomparendos = addKeyword(['multas','comparendos','multa','comparendo']).addAnswer(
    [             
        'En nuestro servicio de Multas, Comparendos y Acuerdos de Pago, nos encargamos de resolver tus problemas de tránsito de manera rápida y efectiva. Nos especializamos en la gestión y eliminación de multas, comparendos y acuerdos de pago. Con un equipo altamente capacitado y dedicado, ofrecemos soluciones personalizadas para limpiar tu historial de conducción y garantizar tu tranquilidad en la carretera. Nuestro objetivo es que puedas continuar con tu movilidad sin contratiempos.',
        'Tiempo estimado de limpieza del estado de cuenta:',   
        'La gestión para la eliminación de infracciones puede realizarse en un plazo aproximado de una semana hábil, o incluso menos, dependiendo de la complejidad del registro de la infracción.',     
    ])
    .addAnswer(
    [
        '¿Deseas realizar el servicio?',
        '*Escribe la opción en palabra como se muestra, “no números”.*',
        '*-Si, deseo iniciar*',
        '*-No gracias*',
    ],
    null,
    null,
    [flowSideseoiniciar, flowNogracias]
    )


const flowMovilidadytransito = addKeyword(['1','movilidad','transito']).addAnswer(
    [
        'En Tramita Movilidad, somos especialistas en la gestión eficiente de trámites de tránsito. Nuestro equipo altamente capacitado trabaja con diligencia para eliminar comparendos y solucionar cualquier inconveniente relacionado con tu historial de conducción.',
        'Garantizamos un proceso rápido, transparente y confiable, diseñado para brindarte la tranquilidad que necesitas mientras nos ocupamos de todos los detalles. Nuestro compromiso es facilitarte el camino hacia una movilidad sin complicaciones, respaldado por soluciones efectivas y asesoría profesional.',
    ])
    .addAnswer([  
        '¿Qué servicio deseas realizar?',   
        '*Escribe la opción en palabra como se muestra, “no números”.*',
        '*-Multas y comparendos*',
        '*-Cambio de estado de licencia*',
        '*-Otro servicio o trámite.*',

    ],
    null,
    null,
    [flowMultasycomparendos, flowCambiodeestadodelicencia, flowNogracias, flowOtroservicio]
    ) 


const flowPrincipal = addKeyword(['hola', 'ole', 'alo','buenas','necesito',]).addAnswer(
    [
    '👋Hola , gracias por comunicarte con Tramita Movilidad',    
    '¡Nos alegra mucho tenerte aquí! 😊',
    'Visita nuestra página web para mayor información:',
    'https://tramitesyserviciosmovil.website/',
    've también nuestra información legal como NIT, RUT y Cámara De Comercio:',
    'https://tramitesyserviciosmovil.website/documentacion-legal/',
    'Soy Fernanda Garcia, tu asistente virtual. Por favor indícame qué es lo que deseas hacer , marca el número de la opción que desear consultar.',
    ])
    .addAnswer (
        [   ' *Escribe la opción en palabra como se muestra, “no números”.*',  
            ' *-Movilidad y transito*🚗🚧',
            ' *-Reclamos O Soporte*📥',
        ],
        null,
        null,
        [flowMovilidadytransito, flowReclamosOSoporte,]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()