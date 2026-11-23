export const STAGE_WIDTH = 1612;
export const STAGE_HEIGHT = 211;

const KEY_TOP = 3.2771;
const WHITE_WIDTH = 29;
const WHITE_HEIGHT = 203;
const BLACK_VISUAL_INSET = 2.5;
const BLACK_VISUAL_WIDTH = 24.5;
const BLACK_HEIGHT = 140;
const LOW_CUT_WIDTH = 19.8;
const LOW_CUT_HEIGHT = 155;
const WHITE_PITCH = 31;
const FIRST_WHITE_LEFT = 1;
const ARTBOARD_WIDTH = 439;
const ARTBOARD_FIRST_WHITE_LEFT = 4.1287;
const BLOCK_WIDTH = 14 * WHITE_PITCH;

const BLACK_OFFSETS: Record<string, number> = {
  C: 17.973,
  D: 22.958,
  F: 17.622,
  G: 20.489,
  A: 23.451,
};

const FLAT_NAMES: Record<string, string> = {
  C: 'Db',
  D: 'Eb',
  F: 'Gb',
  G: 'Ab',
  A: 'Bb',
};

type KeyEntry = [string, number];

const KEY_GROUPS: Array<{ white: KeyEntry; black?: KeyEntry }> = [
  { white: ['A0', 20], black: ['A0s', 81] },
  { white: ['B0', 83] },
  ...[1, 2, 3, 4, 5, 6, 7].flatMap((octave) => [
    { white: [`C${octave}`, 20] as KeyEntry, black: [`C${octave}s`, 81] as KeyEntry },
    { white: [`D${octave}`, 65] as KeyEntry, black: [`D${octave}s`, 87] as KeyEntry },
    { white: [`E${octave}`, 83] as KeyEntry },
    { white: [`F${octave}`, 68] as KeyEntry, black: [`F${octave}s`, 82] as KeyEntry },
    { white: [`G${octave}`, 70] as KeyEntry, black: [`G${octave}s`, 84] as KeyEntry },
    { white: [`A${octave}`, 71] as KeyEntry, black: [`A${octave}s`, 89] as KeyEntry },
    { white: [`B${octave}`, 72] as KeyEntry },
  ]),
  { white: ['C8', 83] },
];

export interface RiveSegment {
  id: string;
  artboard: string;
  stateMachine: string;
  left: number;
  right: number;
  artboardLeft: number;
  artboardTop: number;
  artboardWidth: number;
  artboardHeight: number;
  clipPath?: string;
}

export interface RiveTarget {
  segment: string;
  path?: string;
}

export interface PianoKeyLayout {
  note: string;
  keyCode: number;
  isBlack: boolean;
  targets: RiveTarget[];
  left: number;
  top: number;
  width: number;
  height: number;
}

const whiteLeft = (index: number) => FIRST_WHITE_LEFT + WHITE_PITCH * index;

const whiteIndexOfC = (octave: number) => 2 + 7 * (octave - 1);

const percent = (value: number, total: number) => (value / total) * 100;

const createBlock = (octave: number, left: number, right: number, clipPath?: string): RiveSegment => {
  const cLeft = whiteLeft(whiteIndexOfC(octave));

  return {
    id: `block${octave}`,
    artboard: 'Main',
    stateMachine: 'Main',
    left,
    right,
    artboardLeft: cLeft - ARTBOARD_FIRST_WHITE_LEFT,
    artboardTop: 0,
    artboardWidth: ARTBOARD_WIDTH,
    artboardHeight: STAGE_HEIGHT,
    clipPath,
  };
};

const createSingleKey = (id: string, index: number): RiveSegment => {
  const left = whiteLeft(index);

  return {
    id,
    artboard: 'White key',
    stateMachine: 'Press',
    left,
    right: left + WHITE_WIDTH,
    artboardLeft: left,
    artboardTop: KEY_TOP,
    artboardWidth: WHITE_WIDTH,
    artboardHeight: WHITE_HEIGHT,
  };
};

const buildSegments = (): RiveSegment[] => {
  const lowLeft = whiteLeft(0) - 1;
  const lowWidth = whiteLeft(2) - lowLeft;
  const cutX = percent(whiteLeft(0) + LOW_CUT_WIDTH - lowLeft, lowWidth);
  const cutY = percent(LOW_CUT_HEIGHT, STAGE_HEIGHT);
  const lowClip = `polygon(${cutX}% 0, 100% 0, 100% 100%, 0 100%, 0 ${cutY}%, ${cutX}% ${cutY}%)`;
  const lastWhiteIndex = KEY_GROUPS.length - 1;

  const blockStart = (octave: number) => whiteLeft(whiteIndexOfC(octave)) - 1;

  return [
    createSingleKey('A0', 0),
    createSingleKey('C8', lastWhiteIndex),
    createBlock(-1, lowLeft, whiteLeft(2), lowClip),
    createBlock(1, blockStart(1), blockStart(1) + BLOCK_WIDTH),
    createBlock(3, blockStart(3), blockStart(3) + BLOCK_WIDTH),
    createBlock(5, blockStart(5), blockStart(5) + BLOCK_WIDTH),
    createBlock(7, blockStart(7), whiteLeft(lastWhiteIndex) - 1),
  ];
};

export const RIVE_SEGMENTS = buildSegments();

const blockTarget = (note: string): RiveTarget => {
  const letter = note[0];
  const octave = Number(note[1]);
  const isSharp = note.endsWith('s');
  const blockOctave = octave % 2 === 1 ? octave : octave - 1;
  const fileOctave = octave - blockOctave + 3;
  const name = isSharp ? `${FLAT_NAMES[letter]}${fileOctave}` : `${letter}${fileOctave}`;

  return { segment: `block${blockOctave}`, path: `${name} key` };
};

const locate = (note: string): Pick<PianoKeyLayout, 'targets'> => {
  if (note === 'C8') {
    return { targets: [{ segment: note }] };
  }

  if (note === 'A0') {
    return { targets: [{ segment: note }, blockTarget(note)] };
  }

  return { targets: [blockTarget(note)] };
};

const buildKeys = (): PianoKeyLayout[] => {
  const keys: PianoKeyLayout[] = [];

  KEY_GROUPS.forEach((group, index) => {
    const [whiteNote, whiteCode] = group.white;
    const left = whiteLeft(index);

    keys.push({
      note: whiteNote,
      keyCode: whiteCode,
      isBlack: false,
      ...locate(whiteNote),
      left: percent(left, STAGE_WIDTH),
      top: percent(KEY_TOP, STAGE_HEIGHT),
      width: percent(WHITE_WIDTH, STAGE_WIDTH),
      height: percent(WHITE_HEIGHT, STAGE_HEIGHT),
    });

    if (group.black) {
      const [blackNote, blackCode] = group.black;

      keys.push({
        note: blackNote,
        keyCode: blackCode,
        isBlack: true,
        ...locate(blackNote),
        left: percent(left + BLACK_OFFSETS[whiteNote[0]] - BLACK_VISUAL_INSET, STAGE_WIDTH),
        top: percent(KEY_TOP, STAGE_HEIGHT),
        width: percent(BLACK_VISUAL_WIDTH, STAGE_WIDTH),
        height: percent(BLACK_HEIGHT, STAGE_HEIGHT),
      });
    }
  });

  return keys;
};

export const PIANO_KEYS = buildKeys();

export const PIANO_KEYS_BY_LAYER = [
  ...PIANO_KEYS.filter((key) => !key.isBlack),
  ...PIANO_KEYS.filter((key) => key.isBlack),
];

export const PIANO_KEY_BY_NOTE = new Map(PIANO_KEYS.map((key) => [key.note, key]));

export const findKeyByCode = (keyCode: number) =>
  PIANO_KEYS.find((key) => key.keyCode === keyCode);
