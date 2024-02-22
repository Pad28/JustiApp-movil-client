export interface UserAuthenticated {
    user:  User;
    token: string;
}

export interface User {
    matricula:    string;
    nombre:       string;
    apellidos:    string;
    correo:       string;
    estado:       boolean;
    rol:          string;
    tutor:        null | string;
    cuatrimestre: null | number;
    grupo:        null | string;
    direccion:    string;
}
