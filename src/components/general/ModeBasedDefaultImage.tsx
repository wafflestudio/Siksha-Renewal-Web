import DefaultImageLight from "assets/icons/default-profile.svg";
import DefaultImageDark from "assets/icons/default-profile-dark.svg";
import UseCurrentTheme from "hooks/UseCurrentTheme";

export default function ModeBasedDefaultImage() {
  const currentTheme = UseCurrentTheme();

  return currentTheme === "dark" ? (
    <DefaultImageDark aria-label="기본 이미지" />
  ) : (
    <DefaultImageLight aria-label="기본 이미지" />
  );
}
