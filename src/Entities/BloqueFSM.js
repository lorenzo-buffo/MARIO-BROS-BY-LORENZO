// BloqueFSM.js
export class BloqueFSM {
    constructor(bloque, escena, tipo = "normal") {
        this.bloque = bloque;
        this.escena = escena;
        this.tipo = tipo; // "normal" o "misterioso"
        this.state = 'idle';
    }

    setState(nuevoEstado) {
        if (this.state === nuevoEstado) return;
        this.state = nuevoEstado;
        this.enterState(nuevoEstado);
    }

    enterState(estado) {
        switch (estado) {
           case 'bumped':
    if (this.tipo === 'normal') {
        if (this.bloque.tieneEstrella) {
            // Si tiene estrella, levantar y generar objeto
            this.bloque.setY(this.bloque.originalY - 10);
            this.escena.tweens.add({
                targets: this.bloque,
                y: this.bloque.originalY,
                duration: 100,
                onComplete: () => this.setState('spawnPower')
            });
        } else if (this.escena.personaje.fsm.forma === 'big' || this.escena.personaje.fsm.forma === 'fire') {
            this.setState('used'); // destruir bloque
        } else {
            // Levantar sin generar nada
            this.bloque.setY(this.bloque.originalY - 10);
            this.escena.tweens.add({
                targets: this.bloque,
                y: this.bloque.originalY,
                duration: 100,
                onComplete: () => this.setState('idle') // 🔁 permite que vuelva a saltar si se toca otra vez
            });
        }
    } else if (this.tipo === 'misterioso') {
        this.bloque.setY(this.bloque.originalY - 10);
        this.escena.tweens.add({
            targets: this.bloque,
            y: this.bloque.originalY,
            duration: 100,
            onComplete: () => this.setState('spawnPower')
        });
    }
    break;


            case 'spawnPower':
    if (this.tipo === 'misterioso') {
        this.escena.generarObjeto(this.bloque);
    } else if (this.tipo === 'normal' && this.bloque.tieneEstrella) {
        this.escena.generarObjeto(this.bloque);
    }

    // ✅ Agregar un pequeño delay antes de ir a 'used'
    this.escena.time.delayedCall(100, () => {
        this.setState('used');
    });

    break;


            case 'used':
                if (this.tipo === 'misterioso') {
                    // Reemplazar por bloque vacío
                    this.bloque.destroy();
                    const bloqueVacio = this.escena.bloquesVacios.create(this.bloque.x, this.bloque.originalY, 'bloqueVacio');
                    this.escena.physics.add.collider(this.escena.personaje, bloqueVacio);
                } else {
                    // Destruir bloque normal
                    this.escena.sonidoRomperBloque.play();
                    this.bloque.destroy();
                }
                break;
        }
    }

    update() {}
}
