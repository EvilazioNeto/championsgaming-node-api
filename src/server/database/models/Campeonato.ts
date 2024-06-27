export interface ICampeonato {
    id: number;
    nome: string;
    dataInicio: Date;
    dataFim: Date;
    usuarioId: number;
    status: string;
    numeroRodadas: number;
    quantidadeTimes: number
}
