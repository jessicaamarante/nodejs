import dayjs from "dayjs"
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')
dayjs.extend(localizedFormat)

export { dayjs }

//criado esse arquivo com os imports da lib dayjs e configs pois sera usado em mais de uma rota e para facilitar so precisa importar esse arquivo na rota q foi utilizar