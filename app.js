const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowNogracias = addKeyword(['no','No gracias']).addAnswer(['Déjanos saber porque no te interesa o si tienes alguna duda o inquietud en la que te podamos colaborar.'])


const flowSideseoiniciar = addKeyword(['Si, deseo iniciar','si','iniciar']).addAnswer(
    [
        '⚠️ IMPORTANTE, LEER CON ATENCIÓN ⚠️',
        '1.	No somos abogados como las publicaciones comunes.',
        '2.	Hacemos los tramites directamente en tránsito y transporte.',
        '3.	Nuestro trabajo es definitivo y no se vuelven a subir en un tiempo como otros.',
        '4.	Los resultados se pueden validar en un día hábil o menos.', 
        '5.	Revisar su estado de cuenta, o validar su licencia tiene un costo de 25 mil pesos. Esto se hace con el fin de revisar y empezar la gestión de su trámite.',
        'Si aceptas los términos anteriores deja el número de cedula:',


 
        
    ]
)



const flowCambiodeestadodelicencia = addKeyword(['licencia','cambio','estado']).addAnswer(
    [
        'En nuestro servicio de Cambio de Estado de Licencia, nos ocupamos de facilitar y agilizar el proceso de actualización de tu licencia de conducir. Ya sea quitar suspensiones en tu licencia, nuestro equipo está aquí para ayudarte. Nos encargamos de todos los trámites. Con un enfoque rápido y confiable, te ofrecemos la tranquilidad de saber que tu licencia está en orden y lista para cualquier situación en la carretera. ¡Déjanos cuidar de los detalles para que puedas seguir adelante con confianza!',
        'Estas son nuestras políticas de nuestro servicio:',
        '* El cambio del estado de la licencia tiene un tiempo aproximado de 1 día hábil aproximadamente o menos dependiendo de la complejidad del registro de la infracción.',
        '* Es de aclarar que para nosotros iniciemos con el servicio deberás tener el saldo suficiente para cancelar el servicio.',
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
        'En nuestro servicio de Multas, Comparendos y Acuerdos de Pago, nos encargamos de resolver tus problemas de tránsito de manera rápida y efectiva. Nos especializamos en la gestión y eliminación de multas, comparendos y acuerdos de pago. Con un equipo experto y dedicado, te ofrecemos soluciones personalizadas para recuperar tu historial de conducción y garantizar tu tranquilidad en la carretera.',
        'La limpieza del estado de cuenta tiene un tiempo aproximado de 1 día hábil aproximadamente o menos dependiendo de la complejidad del registro de la infracción.',       
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
        'En Transita +, nos especializamos en simplificar tus trámites de tránsito. Nuestro equipo de expertos está dedicado a eliminar tus comparendos y resolver cualquier problema relacionado con tu historial de conducción. Con un enfoque rápido, confiable y transparente, estamos aquí para brindarte la tranquilidad y el apoyo que necesitas en el camino. ¡Déjanos ocuparnos de los detalles para que puedas seguir adelante sin preocupaciones!'
    ])
    .addAnswer([  
        '¿Qué servicio deseas realizar?',   
        '*Escribe la opción en palabra como se muestra, “no números”.*',
        '*-Multas y comparendos*',
        '*-Cambio de estado de licencia*',
    ],
    null,
    null,
    [flowMultasycomparendos, flowCambiodeestadodelicencia, flowNogracias]
    ) 


const flowReclamosOSoporte = addKeyword(['soporte']).addAnswer(['Espera un momento… ⚠',])


const flowOtroservicio = addKeyword(['2']).addAnswer(['Espera un momento… ⚠',])


const flowPrincipal = addKeyword(['hola', 'ole', 'alo','buenas']).addAnswer(
    [
    '👋Hola , gracias por comunicarte con Transita + ✨',    
    '¡Nos alegra mucho tenerte aquí! 😊',
    'Soy Leidy Puentes, tu asistente virtual. Por favor indícame qué es lo que deseas hacer , marca el número de la opción que desear consultar.'
    ])
    .addAnswer (
        [   ' *Escribe la opción en palabra como se muestra, “no números”.*',  
            ' *-Movilidad y transito*🚗🚧',
            ' *-Reclamos O Soporte*📥',
        ],
        null,
        null,
        [flowMovilidadytransito, flowOtroservicio, flowReclamosOSoporte, flowNogracias]
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