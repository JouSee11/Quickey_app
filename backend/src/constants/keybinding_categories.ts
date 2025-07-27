//category selections
export const KEYBINDING_CATEGORIES = ['general', 'gaming', 'media', 'creative', 'programming', 'productivity'] as const
export type KeyBindingCategory = typeof KEYBINDING_CATEGORIES[number]