class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sound_enabled");
      this.enabled = saved === "true";
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("sound_enabled", String(this.enabled));
    }
    if (this.enabled) {
      this.initContext();
      this.playBeep(440, 0.08, "sine");
    }
    return this.enabled;
  }

  public playTudum() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Deep cinematic hit
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(80, now);
      osc1.frequency.exponentialRampToValueAtTime(35, now + 1.2);

      gain1.gain.setValueAtTime(0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 1.4);

      // Low sub bass thump
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(55, now);
      osc2.frequency.exponentialRampToValueAtTime(28, now + 1.6);

      gain2.gain.setValueAtTime(0.6, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now);
      osc2.stop(now + 1.8);

      // Metallic high ring
      const osc3 = this.ctx.createOscillator();
      const gain3 = this.ctx.createGain();
      osc3.type = "triangle";
      osc3.frequency.setValueAtTime(320, now + 0.05);
      osc3.frequency.exponentialRampToValueAtTime(160, now + 0.9);

      gain3.gain.setValueAtTime(0.15, now + 0.05);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

      osc3.connect(gain3);
      gain3.connect(this.ctx.destination);
      osc3.start(now + 0.05);
      osc3.stop(now + 1.0);
    } catch {
      // Audio play error handled safely
    }
  }

  public playClick() {
    if (!this.enabled) return;
    this.playBeep(800, 0.03, "sine", 0.08);
  }

  public playHover() {
    if (!this.enabled) return;
    this.playBeep(420, 0.04, "sine", 0.03);
  }

  public playWhoosh() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.25);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Ignore
    }
  }

  private playBeep(freq: number, duration: number, type: OscillatorType = "sine", vol: number = 0.1) {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundManager();
