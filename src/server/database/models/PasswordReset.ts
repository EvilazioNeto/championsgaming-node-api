export interface IPasswordReset {
    id: number;
    usuarioId: number;
    token: string;
    expires_at: Date;
    created_at: Date;
}
