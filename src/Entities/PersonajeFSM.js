
export class PersonajeFSM {
    constructor(personaje, scene) {
        this.personaje = personaje;
        this.scene = scene;

        this.state = 'idle'; // Movimiento: idle, walk, jump, fall, dead
        this.forma = 'small'; // Forma: small, big, fire
        this.invencible = false; // Modo estrella

        this.cursors = scene.cursors; // Input
    }

  setForma(nuevaForma) {
    if (this.forma === nuevaForma) return;

    console.log(`Cambio de forma: ${this.forma} → ${nuevaForma}`);
    this.forma = nuevaForma;
    this.actualizarAnimacion();

    // Ajuste del cuerpo físico
    const body = this.personaje.body;
    if (!body) return;

    if (nuevaForma === 'small') {
        this.personaje.setSize(16, 16);         // Tamaño físico
        this.personaje.setOffset(0, 0);         // Posición del cuerpo dentro del sprite
        this.personaje.setScale(1);             // Escala visual
    } else {
        this.personaje.setSize(16, 32);         // Más alto
        this.personaje.setOffset(0, 0);         // Alineado abajo
        this.personaje.setScale(1);             // Podés subir esto si tenés sprites grandes
    }

    // Mostrar mensaje visual temporal en el debug FSM
    if (this.scene && this.scene.debugTextoFSM) {
        this.scene.mensajePowerUp = `→ Forma: ${nuevaForma}`;
        this.scene.tiempoPowerUp = this.scene.time.now;
    }
}


    setInvencible(valor) {
        this.invencible = valor; // true o false
    }

    setState(nuevoEstado) {
    if (this.state === nuevoEstado || this.state === 'dead') return;
    console.log(`Cambio de estado: ${this.state} → ${nuevoEstado}`);
    this.state = nuevoEstado;
    this.actualizarAnimacion();
}


    actualizarAnimacion() {
        let key = `${this.forma}-${this.state}`;

        // Si es invencible y existe una animación especial:
        if (this.invencible && this.scene.anims.exists(`invencible-${this.state}`)) {
            key = `invencible-${this.state}`;
        }

        this.personaje.anims.play(key, true);
    }

    update() {
        const body = this.personaje.body;
        if (!body) return;
      
        // Salto o caída
        if (!body.onFloor()) {
          if (body.velocity.y < 0) {
            this.setState('jump');
          } else {
            this.setState('fall');
          }
        } else {
          // Movimiento lateral
          const movimiento = this.scene.inputManager?.getMovement();
          if (movimiento?.x !== 0) {
            this.setState('walk');
          } else {
            this.setState('idle');
          }
        }
      }
      
      
}
