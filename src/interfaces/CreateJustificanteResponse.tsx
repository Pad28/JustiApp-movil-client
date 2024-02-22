export interface CreateJustificanteResponse {
    justificante: Justificante;
}

export interface Justificante {
    direccion:                string;
    estado:                   string;
    fecha_creacion:           string;
    fecha_justificada_fin:    string;
    fecha_justificada_inicio: string;
    id:                       string;
    id_alumno:                string;
    id_evidencia:             null;
    id_tutor:                 string;
    motivo:                   string;
}
