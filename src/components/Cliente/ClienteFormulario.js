import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createCliente } from "../../state-mgmt/actions/cliente.actions";
import { Form, Input, Button } from "antd";
import notyf from "../../utils/notyf";

const INITIAL_CLIENTE = {
  
  cedula: "",
  nombre: "",
  apellido: "",
  sexo: "",
};

const paddingClientes = {
  padding: "50px",
};

const ClienteFormulario = ({ createCliente }) => {
  const [cliente, setCliente] = useState(INITIAL_CLIENTE);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [valido, setValido] = useState(false);

  useEffect(() => {
    const formularioValido = Object.values(cliente).every((v) => Boolean(v));

    setValido(formularioValido);
  }, [cliente]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError(undefined);
    setCliente((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createCliente({ ...cliente });

      notyf.success("Cliente creado satisfactoriamente.");
      setSuccess(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const validateMessages = {
    required: "El campo ${label} es obligatorio.",
    types: {
      email: "${label} no es un email válido.",
      number: "${label} no es un número válido.",
    },
    number: {
      range: "${label} debe estar entre ${min} y ${max}.",
    },
  };

  return (
    <div className="container mt-4">
      <div className="row " style={paddingClientes}>
        {success && <Redirect to="/clientes"></Redirect>}
        <div>
          <div>
            <h4>Crear cliente</h4>
            <Form
              onSubmitCapture={(e) => handleSubmit(e)}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={"nombre"}
                label="Nombre"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Nombre"
                  name="nombre"
                  value={cliente.nombre}
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"apellido"}
                label="Apellido"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Apellido"
                  name="apellido"
                  value={cliente.apellido}
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"cedula"}
                label="Cedula"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Cédula"
                  name="cedula"
                  maxLength="11"
                  value={cliente.cedula}
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"sexo"}
                label="Sexo"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Femenino o Masculino"
                  value={cliente.sexo}
                  name="sexo"
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              {error && (
                <div className="error-text">
                  <h3>
                    <i className="fas fa-exclamation-circle"></i> Error
                  </h3>
                  <p>{error}</p>
                </div>
              )}
              <Button type="primary" disabled={!valido} htmlType="submit">
                Crear
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { createCliente })(ClienteFormulario);
