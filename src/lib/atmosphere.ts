/**
 * Section-aware atmosphere state.
 *
 * Each major section declares an accent preset; the AmbientField canvas
 * lerps its two primary light fields toward the active preset every frame,
 * so the page background behaves like one living system moving through the
 * chapters rather than per-section spotlights switching on and off.
 */

export interface AtmosphereState {
  /** green field: position (viewport fractions) + intensity */
  gx: number;
  gy: number;
  ga: number;
  /** blue field: position + intensity */
  bx: number;
  by: number;
  ba: number;
}

export const ATMOSPHERES: Record<string, AtmosphereState> = {
  hero: { gx: 0.14, gy: 0.62, ga: 0.15, bx: 0.82, by: 0.3, ba: 0.19 },
  built: { gx: 0.18, gy: 0.22, ga: 0.2, bx: 0.9, by: 0.75, ba: 0.1 },
  tracks: { gx: 0.1, gy: 0.85, ga: 0.1, bx: 0.85, by: 0.16, ba: 0.2 },
  week: { gx: 0.22, gy: 0.3, ga: 0.12, bx: 0.7, by: 0.6, ba: 0.13 },
  people: { gx: 0.12, gy: 0.35, ga: 0.19, bx: 0.88, by: 0.8, ba: 0.09 },
  district: { gx: 0.3, gy: 0.9, ga: 0.11, bx: 0.75, by: 0.25, ba: 0.22 },
  passes: { gx: 0.15, gy: 0.75, ga: 0.1, bx: 0.82, by: 0.45, ba: 0.16 },
  final: { gx: 0.12, gy: 0.85, ga: 0.24, bx: 0.86, by: 0.2, ba: 0.24 },
};

/** Live target — AmbientField lerps toward this each frame. */
export const atmosphereTarget: AtmosphereState = { ...ATMOSPHERES.hero };

export function setAtmosphere(name: string) {
  const preset = ATMOSPHERES[name];
  if (!preset) return;
  Object.assign(atmosphereTarget, preset);
}

/** Momentary accent nudge (e.g. hovering a track) that the scroll state overrides. */
export function nudgeAtmosphere(partial: Partial<AtmosphereState>) {
  Object.assign(atmosphereTarget, partial);
}
