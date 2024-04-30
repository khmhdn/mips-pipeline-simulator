<template>
  <div @resize.window="watchScreen()">
    <div
      class="flex h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light"
    >
      <!-- Sidebar -->
      <div class="flex flex-shrink-0 transition-all">
        <div
          v-show="isSidebarOpen"
          @click="isSidebarOpen = false"
          class="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
        ></div>
        <div
          v-show="isSidebarOpen"
          class="fixed inset-y-0 z-10 w-16 bg-white"
        ></div>

        <!-- Mobile bottom bar -->
        <nav
          aria-label="Options"
          class="fixed inset-x-0 bottom-0 flex flex-row-reverse items-center justify-between px-4 py-2 bg-white border-t border-indigo-100 sm:hidden shadow-t rounded-t-3xl"
        >
          <!-- Menu button -->
          <button
            @click="
              isSidebarOpen && currentSidebarTab == 'linksTab'
                ? (isSidebarOpen = false)
                : (isSidebarOpen = true);
              currentSidebarTab = 'linksTab';
            "
            class="flex justify-center items-center p-2 transition-colors rounded-lg shadow-md hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2"
            :class="
              isSidebarOpen && currentSidebarTab == 'linksTab'
                ? 'text-white bg-indigo-600'
                : 'text-gray-500 bg-white'
            "
          >
            <span class="sr-only">Toggle sidebar</span>
            <span class="icon-[heroicons-solid--menu-alt-2] size-6"></span>
          </button>

          <!-- Logo -->
          <h4 class="font-bold">MIPS Simulator</h4>

          <img src="/src/assets/images/logo.png" alt="" class="w-12" />
        </nav>

        <!-- Left mini bar -->
        <nav
          aria-label="Options"
          class="z-20 flex-col items-center flex-shrink-0 hidden w-16 py-4 bg-white border-r-2 border-indigo-100 shadow-md sm:flex rounded-tr-3xl rounded-br-3xl"
        >
          <!-- Logo -->
          <div class="flex-shrink-0 py-4">
            <img src="/src/assets/images/logo.png" alt="" class="w-12" />
          </div>
          <div class="flex flex-col items-center flex-1 p-2 space-y-4">
            <!-- Home button -->
            <button
              @click="router.push('/')"
              class="flex justify-center items-center p-2 transition-colors rounded-lg shadow-md hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2"
              :class="
                route.path == '/'
                  ? 'text-white bg-indigo-600'
                  : 'text-gray-500 bg-white'
              "
            >
              <span class="icon-[heroicons--home] size-6"></span>
            </button>
            <!-- Files button -->
            <button
              @click="
                isSidebarOpen && currentSidebarTab == 'messagesTab'
                  ? (isSidebarOpen = false)
                  : (isSidebarOpen = true);
                currentSidebarTab = 'messagesTab';
              "
              class="flex justify-center items-center p-2 transition-colors rounded-lg shadow-md hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2"
              :class="
                isSidebarOpen && currentSidebarTab == 'messagesTab'
                  ? 'text-white bg-indigo-600'
                  : 'text-gray-500 bg-white'
              "
            >
              <span class="sr-only">Toggle message panel</span>
              <span class="icon-[bi--file-text] size-6"></span>
            </button>
            <!-- Menu button -->
            <button
              @click="
                isSidebarOpen && currentSidebarTab == 'linksTab'
                  ? (isSidebarOpen = false)
                  : (isSidebarOpen = true);
                currentSidebarTab = 'linksTab';
              "
              class="flex justify-center items-center p-2 transition-colors rounded-lg shadow-md hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2"
              :class="
                isSidebarOpen && currentSidebarTab == 'linksTab'
                  ? 'text-white bg-indigo-600'
                  : 'text-gray-500 bg-white'
              "
            >
              <span class="sr-only">Toggle sidebar</span>
              <span class="icon-[heroicons-solid--menu-alt-2] size-6"></span>
            </button>
          </div>

          <!-- User avatar -->
          <div class="relative flex items-center flex-shrink-0 p-2">
            <span class="icon-[mdi--copyright] size-6"></span>
          </div>
        </nav>

        <Transition name="moveL">
          <div
            v-show="isSidebarOpen"
            class="fixed inset-y-0 left-0 z-10 flex-shrink-0 w-64 bg-white border-r-2 border-indigo-100 shadow-lg sm:left-16 rounded-tr-3xl rounded-br-3xl sm:w-72 lg:static lg:w-64 transition-all duration-300 overflow-hidden"
          >
            <Transition name="moveL">
              <nav
                v-show="currentSidebarTab == 'linksTab'"
                aria-label="Main"
                class="flex flex-col h-full"
              >
                <!-- Logo -->
                <div
                  class="flex items-center justify-center flex-shrink-0 py-10"
                >
                  <h1 class="text-xl font-medium">MIPS pipeline</h1>
                </div>

                <!-- Links -->
                <div
                  class="flex-1 px-4 space-y-2 overflow-hidden hover:overflow-auto"
                >
                  <div
                    @click="router.push('/pipeline')"
                    class="flex items-center w-full space-x-2 hover:bg-indigo-600 hover:text-white rounded-lg cursor-pointer"
                    :class="
                      route.path == '/pipeline'
                        ? 'bg-indigo-600 text-white'
                        : 'text-indigo-600'
                    "
                  >
                    <span
                      aria-hidden="true"
                      class="flex items-center p-2 transition-colors rounded-lg group group-hover:bg-indigo-700 group-hover:text-white"
                      :class="
                        route.path == '/pipeline'
                          ? 'bg-indigo-700 text-white'
                          : ''
                      "
                    >
                      <span class="icon-[mdi--file-outline] size-6"></span>
                    </span>
                    <span>Pipeline program</span>
                  </div>
                  <div
                    @click="router.push('/pipeline/states')"
                    class="flex items-center w-full space-x-2 hover:bg-indigo-600 hover:text-white rounded-lg cursor-pointer"
                    :class="
                      route.path == '/pipeline/states'
                        ? 'bg-indigo-600 text-white'
                        : 'text-indigo-600'
                    "
                  >
                    <span
                      aria-hidden="true"
                      class="flex items-center p-2 transition-colors rounded-lg group group-hover:bg-indigo-700 group-hover:text-white"
                      :class="
                        route.path == '/pipeline/states'
                          ? 'bg-indigo-700 text-white'
                          : ''
                      "
                    >
                      <span class="icon-[bi--grid] size-6"></span>
                    </span>
                    <span>Pipeline states</span>
                  </div>
                  <div
                    @click="router.push('/pipeline/display')"
                    class="flex items-center space-x-2 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white cursor-pointer"
                    :class="
                      route.path == '/pipeline/display'
                        ? 'bg-indigo-600 text-white'
                        : 'text-indigo-600'
                    "
                  >
                    <span
                      aria-hidden="true"
                      class="flex items-center p-2 transition-colors rounded-lg group-hover:bg-indigo-700 group-hover:text-white"
                      :class="
                        route.path == '/pipeline/display'
                          ? 'bg-indigo-700 text-white'
                          : ''
                      "
                    >
                      <span class="icon-[bi--list-nested] size-6"></span>
                    </span>
                    <span>Pipeline display</span>
                  </div>
                </div>
              </nav>
            </Transition>

            <Transition name="moveL">
              <section
                v-show="currentSidebarTab == 'messagesTab'"
                class="px-4 py-6"
              >
                <h2 class="text-xl font-medium mb-9">Files</h2>
                <div
                  @click="router.push('/file')"
                  class="flex items-center space-x-2 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white cursor-pointer"
                  :class="
                    route.path == '/file'
                      ? 'bg-indigo-600 text-white'
                      : 'text-indigo-600'
                  "
                >
                  <span
                    aria-hidden="true"
                    class="p-2 transition-colors rounded-lg group-hover:bg-indigo-700 group-hover:text-white flex items-center"
                    :class="
                      route.path == '/file' ? 'bg-indigo-700 text-white' : ''
                    "
                  >
                    <span
                      class="icon-[mdi--file-document-add-outline] size-6"
                    ></span>
                  </span>
                  <span>Add assembelly</span>
                </div>
              </section>
            </Transition>
          </div>
        </Transition>
      </div>
      <div class="flex flex-col flex-1">
        <header
          class="relative flex items-center justify-between flex-shrink-0 p-4"
        >
          <form action="#" class="flex-1">
            <!--  -->
          </form>
          <div class="items-center hidden ml-4 sm:flex">
            <button
              @click="isSettingsPanelOpen = true"
              class="p-2 mr-4 text-gray-400 bg-white rounded-lg shadow-md hover:text-gray-600 focus:outline-none focus:ring focus:ring-white focus:ring-offset-gray-100 focus:ring-offset-4"
            >
              <span class="sr-only">Settings</span>
              <svg
                aria-hidden="true"
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            <!-- Github link -->
            <a
              href="https://github.com/DtechB"
              target="_blank"
              class="p-2 text-white bg-black rounded-lg shadow-md hover:text-gray-200 focus:outline-none focus:ring focus:ring-black focus:ring-offset-gray-100 focus:ring-offset-2"
            >
              <span class="sr-only">github link</span>
              <svg
                aria-hidden="true"
                class="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.026,2c-5.509,0-9.974,4.465-9.974,9.974c0,4.406,2.857,8.145,6.821,9.465 c0.499,0.09,0.679-0.217,0.679-0.481c0-0.237-0.008-0.865-0.011-1.696c-2.775,0.602-3.361-1.338-3.361-1.338 c-0.452-1.152-1.107-1.459-1.107-1.459c-0.905-0.619,0.069-0.605,0.069-0.605c1.002,0.07,1.527,1.028,1.527,1.028 c0.89,1.524,2.336,1.084,2.902,0.829c0.091-0.645,0.351-1.085,0.635-1.334c-2.214-0.251-4.542-1.107-4.542-4.93 c0-1.087,0.389-1.979,1.024-2.675c-0.101-0.253-0.446-1.268,0.099-2.64c0,0,0.837-0.269,2.742,1.021 c0.798-0.221,1.649-0.332,2.496-0.336c0.849,0.004,1.701,0.115,2.496,0.336c1.906-1.291,2.742-1.021,2.742-1.021 c0.545,1.372,0.203,2.387,0.099,2.64c0.64,0.696,1.024,1.587,1.024,2.675c0,3.833-2.33,4.675-4.552,4.922 c0.355,0.308,0.675,0.916,0.675,1.846c0,1.334-0.012,2.41-0.012,2.737c0,0.267,0.178,0.577,0.687,0.479 C19.146,20.115,22,16.379,22,11.974C22,6.465,17.535,2,12.026,2z"
                ></path>
              </svg>
            </a>
          </div>

          <!-- Mobile sub header button -->
          <button
            @click="isSubHeaderOpen = !isSubHeaderOpen"
            class="p-2 text-gray-400 bg-white rounded-lg shadow-md sm:hidden hover:text-gray-600 focus:outline-none focus:ring focus:ring-white focus:ring-offset-gray-100 focus:ring-offset-4"
          >
            <span class="sr-only">More</span>

            <svg
              aria-hidden="true"
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>

          <!-- Mobile sub header -->
          <Transition name="moveUp">
            <div
              v-show="isSubHeaderOpen"
              @click.away="isSubHeaderOpen = false"
              class="absolute flex items-center justify-between p-2 bg-white rounded-md shadow-lg sm:hidden top-16 left-5 right-5"
            >
              <!-- Seetings button -->
              <button
                @click="
                  isSettingsPanelOpen = true;
                  isSubHeaderOpen = false;
                "
                class="p-2 text-gray-400 bg-white rounded-lg shadow-md hover:text-gray-600 focus:outline-none focus:ring focus:ring-white focus:ring-offset-gray-100 focus:ring-offset-4"
              >
                <span class="sr-only">Settings</span>
                <svg
                  aria-hidden="true"
                  class="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>

              <!-- Files button -->
              <button
                @click="
                  isSidebarOpen = true;
                  currentSidebarTab = 'messagesTab';
                  isSubHeaderOpen = false;
                "
                class="flex justify-center items-center p-2 text-gray-400 bg-white rounded-lg shadow-md hover:text-gray-600 focus:outline-none focus:ring focus:ring-white focus:ring-offset-gray-100 focus:ring-offset-4"
              >
                <span class="sr-only">Toggle files panel</span>
                <span class="icon-[bi--file-text] size-6"></span>
              </button>
              <button
                @click="
                  router.push('/');
                  isSubHeaderOpen = false;
                "
                class="flex justify-center items-center p-2 text-gray-400 bg-white rounded-lg shadow-md hover:text-gray-600 focus:outline-none focus:ring focus:ring-white focus:ring-offset-gray-100 focus:ring-offset-4"
              >
                <span class="sr-only">Toggle files panel</span>
                <span class="icon-[heroicons--home] size-6"></span>
              </button>
              <!-- Github link -->
              <a
                href="https://github.com/DtechB"
                target="_blank"
                class="p-2 text-white bg-black rounded-lg shadow-md hover:text-gray-200 focus:outline-none focus:ring focus:ring-black focus:ring-offset-gray-100 focus:ring-offset-2"
              >
                <span class="sr-only">github link</span>
                <svg
                  aria-hidden="true"
                  class="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.026,2c-5.509,0-9.974,4.465-9.974,9.974c0,4.406,2.857,8.145,6.821,9.465 c0.499,0.09,0.679-0.217,0.679-0.481c0-0.237-0.008-0.865-0.011-1.696c-2.775,0.602-3.361-1.338-3.361-1.338 c-0.452-1.152-1.107-1.459-1.107-1.459c-0.905-0.619,0.069-0.605,0.069-0.605c1.002,0.07,1.527,1.028,1.527,1.028 c0.89,1.524,2.336,1.084,2.902,0.829c0.091-0.645,0.351-1.085,0.635-1.334c-2.214-0.251-4.542-1.107-4.542-4.93 c0-1.087,0.389-1.979,1.024-2.675c-0.101-0.253-0.446-1.268,0.099-2.64c0,0,0.837-0.269,2.742,1.021 c0.798-0.221,1.649-0.332,2.496-0.336c0.849,0.004,1.701,0.115,2.496,0.336c1.906-1.291,2.742-1.021,2.742-1.021 c0.545,1.372,0.203,2.387,0.099,2.64c0.64,0.696,1.024,1.587,1.024,2.675c0,3.833-2.33,4.675-4.552,4.922 c0.355,0.308,0.675,0.916,0.675,1.846c0,1.334-0.012,2.41-0.012,2.737c0,0.267,0.178,0.577,0.687,0.479 C19.146,20.115,22,16.379,22,11.974C22,6.465,17.535,2,12.026,2z"
                  ></path>
                </svg>
              </a>
            </div>
          </Transition>
        </header>

        <div class="flex flex-1">
          <!-- Main -->
          <router-view />
        </div>
      </div>
    </div>

    <!-- Panels -->

    <!-- Settings Panel -->
    <!-- Backdrop -->
    <div
      v-show="isSettingsPanelOpen"
      class="fixed inset-0 bg-black bg-opacity-50"
      @click="isSettingsPanelOpen = false"
      aria-hidden="true"
    ></div>
    <!-- Panel -->
    <Transition name="move">
      <section
        v-show="isSettingsPanelOpen"
        class="fixed inset-y-0 right-0 w-64 bg-white border-l border-indigo-100 rounded-l-3xl"
      >
        <div class="px-4 py-8">
          <h2 class="text-lg font-semibold">Settings</h2>
          <Settings
            v-if="isSettingsPanelOpen"
            @close-sidebar="isSettingsPanelOpen = false"
            class="mt-8"
          />
        </div>
      </section>
    </Transition>

    <!-- Author links -->
    <div
      class="fixed flex items-center space-x-4 bottom-20 right-5 sm:bottom-5"
    >
      <a
        href="https://telegram.me/DtechB"
        target="_blank"
        class="transition-transform transform hover:scale-125"
      >
        <span class="sr-only">Telegram</span>
        <span class="icon-[logos--telegram] size-6"></span>
      </a>
      <a
        href="https://www.linkedin.com/in/dtechb/"
        target="_blank"
        class="transition-transform transform hover:scale-125"
      >
        <span class="sr-only">Linkedin</span>
        <span class="icon-[logos--linkedin-icon] size-6"></span>
      </a>
    </div>

    <!-- <div
      class="fixed bottom-0 flex justify-center xl:justify-between w-full text-black bg-blue-200 p-1"
    >
      <p>{{ time }}</p>
      <div class="flex items-center">
        Copyright © 2024 DtechB -
        <img src="/src/assets/images/logo.png" alt="" class="w-10" /> Danial
        Bayati
      </div>
      <p>version 1.0.0</p>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import Settings from "../../components/Settings.vue";

const route = useRoute();
const router = useRouter();

onMounted(() => {
  console.log(route.path);
});

const isSidebarOpen = ref(false);
const currentSidebarTab: Ref<any> = ref(null);
const isSettingsPanelOpen = ref(false);
const isSubHeaderOpen = ref(false);
const watchScreen = () => {
  if (window.innerWidth <= 1024) {
    isSidebarOpen.value = false;
  }
};
</script>
