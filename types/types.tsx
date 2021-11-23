export interface Atividade {
    id?: number
    nome: string
    data: string
    horario_inicio: string
    horario_fim: string
    local: string
    link_transmissao: string
    imagem: string
    descricao: string
    evento?: Evento
    tipo_atividade_id: number
    apresentadores: Apresentador[]
    users?: User[]
}

export interface Apresentador {
    id?: number
    nome: string
    email: string
    user_id?: number

}

export interface Categoria {
    id: number
    nome: string
}

export interface Evento {
    id?: number
    nome: string
    expectativa_participantes: number
    descricao: string
    link_evento: string
    breve_descricao: string
    categoria?: Categoria
    categoria_id?: number
    tipo: string
    instituicao?: Instituicao
    usuario?: User
    atividades: Atividade[]
    local: string
    apresentadores_count?: number
    banner?: string
    imagens?: Imagem[]
    imagens_str?: string[]
}

export interface Imagem {
    id: number
    imagem: string
    tipo_imagem_id: number

}

export interface Instituicao {
    id?: number
    nome: string
    cnpj: string
    endereco: string
    latitude: string
    longitude: string
    logo?: string
    administrador?: number
    cidade: string
}

export interface User {
    id: number
    nome: string
    email: string
    cpf: string
    password: string
    telefone: string
    remember_token: string
    pivot?: {
        participou: number
        apresentador_id: number
        nome_apresentador: string
        email_apresentador: string
    }
}

export interface TipoAtividade {
    id: number
    nome: string
}

export interface Certificado {
    id: number
    descricao: string
    codigo_verificacao: string
    data_emissao: string
    nome_evento: string
    horas: number
}

export interface ModeloCertificado {
    id: number
    titulo: string
    certificados?: Certificado[]

}
