<template>
	<div class="container px-6 py-16">
		<div
			class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800"
		>
			<div
				class="md:w-9/12 lg:w-6/12 lg:ml-20 bg-white p-5 border border-gray-300 rounded shadow-sm"
			>
				<div class="flex justify-center">
					<div>
						<div class="flex justify-center">
							<div class="w-32 border-2 rounded-full border-gray-300">
								<img src="galaxy.png" alt="" />
							</div>
						</div>
						<div class="text-center m-2 text-2xl font-semibold">
							Sign In in Universe blog
						</div>
					</div>
				</div>

				<form @submit.prevent="enterFun">
					<div
						v-if="create"
						class="bg-green-100 p-2 my-2 rounded border border-green-300 text-green-800"
					>
						Create account succuss .
					</div>
					<!-- Email input -->
					<div class="mb-6 space-y-2">
						<label class="font-semibold" for="email">Email address</label>
						<input
							type="text"
							id="email"
							class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
							v-model="enter.email"
						/>
					</div>

					<!-- Password input -->
					<div class="mb-6 space-y-2">
						<label class="font-semibold" for="password">Password</label>
						<input
							type="password"
							id="password"
							class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
							v-model="enter.password"
						/>
					</div>

					<!-- error message -->
					<div
						v-if="!result"
						class="mb-5 bg-red-100 p-2 rounded border border-red-300 text-red-800"
					>
						<h2 class="text-xl mb-3">Oops!... try again</h2>
						<p>Email or Password not valid</p>
					</div>

					<!-- Submit button -->
					<button
						type="submit"
						class="inline-block px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out w-full"
						data-mdb-ripple="true"
						data-mdb-ripple-color="light"
					>
						Sign in
					</button>
				</form>
				<div class="my-3 text-gray-600 text-center">
					You don't have account ?
					<nuxt-link
						class="text-purple-400 hover:text-purple-600 transform duration-200"
						to="/register"
						>Register</nuxt-link
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { enterWithEmail } from "~~/composables/useAuth";

definePageMeta({
	middleware: ["is-login"],
});

const router: any = useRouter();
const currentRoute = ref(router.currentRoute);
const create = ref(currentRoute.value.query.create);

const enter = ref({ email: "", password: "" });
const result = ref(true);
const enterFun = async () => {
	const [res, err] = await enterWithEmail(enter.value);
	if (err) result.value = false;
	else if (res) {
		useCookie("token").value = `Bearer ${res.token}`;
		useState("token").value = `Bearer ${res.token}`;
		useState("user").value = await useUser();
		router.push("/");
	}
};
</script>

<style scoped></style>
