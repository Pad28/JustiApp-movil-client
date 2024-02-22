export interface UserUpdateResponse {
    user: UserUpdate;
}

export interface UserUpdate {
    matricula:    string;
    nombre:       string;
    apellidos:    string;
    correo:       string;
    estado:       boolean;
    rol:          string;
    tutor:        string;
    cuatrimestre: number;
    grupo:        string;
    direccion:    string;
}
