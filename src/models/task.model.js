import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    descripcion:{
        type: String,
        required: true,
    },
    precio:{
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value >= 0;
            },
            message: props => `${props.value} no es un precio válido. El precio debe ser un número positivo.`
        }
    },
    stock:{
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value >= 0;
            },
            message: props => `${props.value} no es un stock válido. El stock debe ser un número positivo.`
        }
    },
    link:{
        type: String,
        required: false,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
});

export default mongoose.model('Task', taskSchema);
