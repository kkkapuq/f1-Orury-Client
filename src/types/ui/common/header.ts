interface HeaderProps {
  title: string;
  isBack?: boolean;
  isExit?: boolean;
  isEllipsis?: boolean;
  isSearching: boolean;
  okHandler?: () => void;
  onExit?: () => void;
  onEdit?: () => void;
  onSearch?: () => void;
  onBack?: () => void;
  routeTo?: string;
}

export default HeaderProps;
