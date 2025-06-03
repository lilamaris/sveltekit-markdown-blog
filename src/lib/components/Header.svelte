<script lang="ts">
    import { Moon, Sun } from '@lucide/svelte';
    import ThemeController, { type AvailableTheme } from './ThemeController.svelte';

    const routes = [
        {
            label: '홈',
            href: '/'
        },
        {
            label: '게시글',
            href: '/posts'
        },
        {
            label: '글쓰기',
            href: '/write'
        },
        {
            label: '소개',
            href: '/about'
        }
    ];
</script>

{#snippet controllerSnippet(theme: AvailableTheme, toggleTheme: () => void)}
    <label class="toggle text-base-content">
        <input
            id="theme-controller"
            type="checkbox"
            onclick={toggleTheme}
            value="dark"
            class="theme-controller"
            checked={theme === 'dark'}
        />
        <Sun size={16} />
        <Moon size={16} />
    </label>
{/snippet}

<header class="h-header-height bg-base-100 text-base-content flex items-center gap-4 px-4">
    <h1 class="text-xl font-bold">Lilamaris 블로그</h1>

    <ul class="flex flex-1 gap-2">
        {#each routes as route}
            <a href={route.href}>
                <li class="hover:bg-base-200 rounded-md px-2 py-1">
                    {route.label}
                </li>
            </a>
        {/each}
    </ul>

    <ThemeController {controllerSnippet} />
</header>
