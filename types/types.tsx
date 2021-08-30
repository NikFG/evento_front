export interface Atividade {
    id: number
    nome: string
    data: string
    horario_inicio: string
    horario_fim: string
    local: string
    link_transmissao: string
    imagem: string
    descricao: string
    evento: string
    tipo_atividade: string
    apresentador: User
}

export interface Categoria {
    id: number
    nome: string
}

export interface Evento {
    id: number
    nome: string
    expectativa_participantes: number
    descricao: string
    link_evento: string
    breve_descricao: string
    categoria: Categoria
    tipo: string
    instituicao: Instituicao
    usuario: User
    atividades: Atividade[]
}

export interface Instituicao {
    id: number
    nome: string
    cnpj: string
    endereco: string
    latitude: string
    longitude: string
    // administrador: User
}

export interface User {
    id: number
    nome: string
    email: string
    cpf: string
    password: string
    telefone: string
    remember_token: string
}
