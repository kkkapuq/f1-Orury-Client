export interface Tab {
  title: string;
  id: number;
}

export interface TabsProps {
  tabs: Record<string, Tab>;
  useStateHook: () => {
    categoryId: number | null;
    setCategoryId: (id: number) => void;
  };
}
