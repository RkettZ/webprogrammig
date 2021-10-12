<template>
  <div class="container-fluid fix_body">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">WEB</a>

        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">หน้าหลัก</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/customers">ลูกค้า</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">สินค้า</router-link>
            </li>
          </ul>
          <span class="text-white p-2"
            >สวัสดีคุณ {{ username }} ({{ email }})</span
          >
          <button @click="logout" type="button" class="btn btn-outline-danger">
            Logout
          </button>
        </div>
      </div>
    </nav>

    <main class="containers">
      <div class="bg-light p-5 rounded">
        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">เพิ่มข้อมูลลูกค้า</h4>

          <div class="row g-3">
            <div class="col-6">
              <label for="customersid" class="form-label">customers ID</label>
              <input
                v-model="customersID"
                type="text"
                class="form-control"
                id="customersid"
                placeholder=""
              />
            </div>

            <div class="col-6">
              <label for="email" class="form-label">Email</label>
              <input
                v-model="customersEmail"
                type="email"
                class="form-control"
                id="email"
                placeholder=""
              />
            </div>

            <div class="col-sm-4">
              <label for="titleName" class="form-label">คำนำหน้าชื่อ</label>
              <input
                v-model="customersTitleName"
                type="text"
                class="form-control"
                id="titleName"
                placeholder=""
                value=""
                required=""
              />
            </div>
            <div class="col-sm-4">
              <label for="firstName" class="form-label">ชื่อ</label>
              <input
                v-model="customersFirstName"
                type="text"
                class="form-control"
                id="firstName"
                placeholder=""
                value=""
                required=""
              />
            </div>

            <div class="col-sm-4">
              <label for="lastName" class="form-label">นามสกุล</label>
              <input
                v-model="customersLastName"
                type="text"
                class="form-control"
                id="lastName"
                placeholder=""
                value=""
                required=""
              />
            </div>

            <div class="col-12">
              <button @click="customers_register" class="btn btn-success">
                เพิ่มข้อมูล
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-light p-5 rounded">
        <p class="lead">ข้อมูลลูกค้า</p>

        <ul>
          <li v-for="(customers, index) in customers" :key="index">
            {{ customer.customersID }} {{ customers.customersTitleName }}
            {{ customer.customersFirstName }} {{ customers.customersLastName }}
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  mounted() {
    this.email = localStorage.getItem("email");
    this.username = localStorage.getItem("username");
    this.load_customer();
  },
  data() {
    return {
      email: null,
      usernames: null,
      customers: null,
      customersID: "",
      customersTitleName: "",
      customersFirstName: "",
      customersLastName: "",
      customersEmail: "",
    };
  },
  methods: {
    customers_register() {
      // customersID: String,
      // customersTitleName: String,
      // customersFirstName: String,
      // customersLastName: String,
      // customersEmail: String,
      axios
        .post("http://localhost:3001/mongo/customers", {
          customersID: this.customerID,
          customersTitleName: this.customerTitleName,
          customersFirstName: this.customerFirstName,
          customersLastName: this.customerLastName,
          customersEmail: this.customerEmail,
        })
        .then( function (res) {3
          Swal.fire({
            title: "สำเร็จ",
            text: res.data.message,
            icon: "success",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1500,
          });
        });
      setTimeout(() => {
        this.load_customers();
      }, 1000);
    },
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
    load_customer() {
      let data = null;
      axios.get("http://localhost:3001/mongo/customers").then(function (res) {
        console.log(res.data);
        data = res.data;
        // this.customers = res.data;
      });
      setTimeout(() => {
        this.customers = data;
      }, 1000);
    },
  },
};
</script>

<style>
.fix_body {
  min-height: 75rem;
  padding-top: 4.5rem;
}
</style>