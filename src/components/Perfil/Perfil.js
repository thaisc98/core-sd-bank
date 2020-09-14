import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deletePerfil } from "../../state-mgmt/actions/perfil-actions";

const Perfil = ({ perfil, deletePerfil }) => {
  const createdAt = JSON.stringify(moment(perfil.created_at).format("LLL"));
  const updatedAt = JSON.stringify(moment(perfil.updated_at).format("LLL"));

  return <div>hola</div>;
};

Perfil.prototype = {
  perfil: PropTypes.object.isRequired,
  deletePerfil: PropTypes.func.isRequired,
};

export default connect(null, { deletePerfil })(Perfil);