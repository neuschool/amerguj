import Link from "next/link";
import { useRouter } from "next/router";
import { Command } from "cmdk";
import { useState, useEffect } from "react";
import {
  CameraIcon,
  CursorIcon,
  EmailIcon,
  GlobeIcon,
  HomeIcon,
  MusicIcon,
  NavigationIcon,
  NoteIcon,
  ShieldIcon,
  SpinnerIcon,
  TwitterIcon,
} from "../Icons";
import { CSSTransitionGroup } from "react-transition-group";
import { Tooltip } from "../Tooltip";
import Badge from "../Badge";
import { YOUR_EMAIL, YOUR_TWITTER } from "./constants";

enum TooltipState {
  HOME,
  MENU,
}

export default function Archipelago() {
  const router = useRouter();
  const currentRoute = router.pathname;
  const isHome = currentRoute === "/";
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState>(undefined);

  const navigate = async (href) => {
    if (!href) return;
    setLoading(true);

    if (href.includes("mailto:")) {
      window.location.href = href;
    } else if (href.includes("//")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else if (href === currentRoute) {
      await router.replace(href);
    } else {
      await router.push(href);
    }

    setLoading(false);
    setOpen(false);
  };

  useEffect(() => {
    router.prefetch("/posts");

    const down = (e) => {
      if (e.keyCode === 75 && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [router]);

  return (
    <>
      <Command.Dialog open={open} onOpenChange={setOpen}>
        <Command.Input placeholder="Go to..." />

        <Command.List>
          {loading && (
            <Command.Loading>
              <div>
                <SpinnerIcon size={24} />
              </div>
            </Command.Loading>
          )}

          <Command.Empty>Maybe someday...</Command.Empty>

          <Command.Group heading="Pages">
            <Command.Item onSelect={() => navigate("/")}>
              <div>
                <HomeIcon size={16} />
                Home
              </div>
            </Command.Item>
            <Command.Item onSelect={() => navigate("/posts")}>
              <div>
                <NoteIcon size={16} />
                Posts
              </div>
            </Command.Item>
            <Command.Item onSelect={() => navigate("/playlists")}>
              <div>
                <MusicIcon size={16} />
                Playlists
              </div>
            </Command.Item>
            <Command.Item onSelect={() => navigate("/globe")}>
              <div>
                <GlobeIcon size={16} />
                Globe
              </div>
            </Command.Item>
            <Command.Item onSelect={() => navigate("/photos")}>
              <div>
                <CameraIcon size={16} />
                Photos
              </div>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Contact">
            <Command.Item onSelect={() => navigate(`//twitter.com/${YOUR_TWITTER}`)}>
              <div>
                <TwitterIcon size={16} />
                Twitter
              </div>
            </Command.Item>
            <Command.Item
              onSelect={() => navigate(`mailto:${YOUR_EMAIL}`)}
            >
              <div>
                <EmailIcon size={16} />
                Email
              </div>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>

      <nav
        className={`${
          isHome ? "w-12" : "w-28"
        } fixed bottom-6 left-6 top-auto z-50 md:bottom-auto md:left-8 md:top-8`}
      >
        <div>
          <CSSTransitionGroup
            className="relative flex h-12 gap-3"
            transitionName="island"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {!isHome ? (
              <div
                className="absolute left-0 rounded-full"
                onMouseEnter={() => setTooltip(TooltipState.HOME)}
                onMouseLeave={() => setTooltip(undefined)}
              >
                <Tooltip open={tooltip === TooltipState.HOME}>Home</Tooltip>
                <Link href="/" className="island">
                  <span className="sr-only">Go home</span>
                  <HomeIcon size={20} />
                </Link>
              </div>
            ) : null}
            <div
              className={`duration-250 absolute rounded-full transition-all ease-out-expo ${
                !isHome ? "delay-50 left-16" : "left-0 delay-300"
              }`}
              onMouseEnter={() => setTooltip(TooltipState.MENU)}
              onMouseLeave={() => setTooltip(undefined)}
            >
              <Tooltip open={tooltip === TooltipState.MENU}>Menu</Tooltip>
              <button
                className="island"
                onClick={() => setOpen((open) => !open)}
              >
                <span className="sr-only">Open menu</span>
                <NavigationIcon size={20} />
              </button>
            </div>
          </CSSTransitionGroup>
        </div>
      </nav>
    </>
  );
}
