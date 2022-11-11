<template>
  <div class="createLink-container">
    <el-form
      ref="postForm"
      :model="postForm"
      :rules="rules"
      class="form-container"
    >
      <sticky
        :z-index="10"
        :class-name="'sub-navbar '+postForm.status"
      >
        <el-button
          v-loading="loading"
          style="margin-left: 10px;"
          type="success"
          @click="submitForm"
        >
          Create
        </el-button>
      </sticky>

      <div class="createLink-main-container">
        <el-row>
          <el-col :span="5">
            <el-form-item
              style="margin-bottom: 40px;"
              prop="name"
            >
              <material-input
                v-model="postForm.name"
                :maxlength="100"
                name="name"
                required
              >
                Product Name
              </material-input>
            </el-form-item>

          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5">
            <el-form-item
              style="margin-bottom: 40px;"
              prop="description"
            >
              <material-input
                v-model="postForm.description"
                :maxlength="200"
                name="name"
                required
              >
                Product Description2
              </material-input>
            </el-form-item>

          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5">
            <el-form-item
              style="margin-bottom: 40px;"
              prop="amount"
            >
              <material-input
                v-model="postForm.amount"
                :maxlength="100"
                name="amount"
                required
              >
                Amount
              </material-input>
            </el-form-item>

          </el-col>
        </el-row>

      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { isValidURL } from '@/utils/validate'
import { getLink, createLink, defaultLinkData } from '@/api/links'
import { getUsers } from '@/api/users'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import MaterialInput from '@/components/MaterialInput/index.vue'
import Sticky from '@/components/Sticky/index.vue'
import Warning from './Warning.vue'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
import { Form } from 'element-ui'

@Component({
  name: 'LinkDetail',
  components: {
    CommentDropdown,
    PlatformDropdown,
    SourceUrlDropdown,
    MaterialInput,
    Sticky,
    Warning
  }
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean

  private validateRequire = (rule: any, value: string, callback: Function) => {
    if (value === '') {
      if (rule.field === 'imageURL') {
        this.$message({
          message: 'Upload cover image is required',
          type: 'error'
        })
      } else {
        this.$message({
          message: rule.field + ' is required',
          type: 'error'
        })
      }
      callback(new Error(rule.field + ' is required'))
    } else {
      callback()
    }
  }

  private validateSourceUrl = (rule: any, value: string, callback: any) => {
    if (value) {
      if (isValidURL(value)) {
        callback()
      } else {
        this.$message({
          message: 'Invalid URL',
          type: 'error'
        })
        callback(new Error('Invalid URL'))
      }
    } else {
      callback()
    }
  }

  private postForm = Object.assign({}, defaultLinkData)
  private loading = false
  private userListOptions = []
  private rules = {
    name: [{ validator: this.validateRequire }],
    description: [{ validator: this.validateRequire }],
    amount: [{ validator: this.validateRequire }]
  }

  private tempTagView?: ITagView
  private tinymceActive = true

  get lang() {
    return AppModule.language
  }

  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  deactivated() {
    this.tinymceActive = false
  }

  activated() {
    this.tinymceActive = true
  }

  private async fetchData(id: number) {
    try {
      const { data } = await getLink(id, { /* Your params here */ })
      this.postForm = data.link
      // Just for test
      // this.postForm.name += `   Link Id:${this.postForm.id}`
      // this.postForm.description += `   Link Id:${this.postForm.id}`
      // this.postForm.amount += `   Link Id:${this.postForm.id}`
      const title = this.lang === 'zh' ? '编辑文章' : 'Edit Link'
      // Set tagsview title
      this.setTagsViewTitle(title)
      // Set page title
      this.setPageTitle(title)
    } catch (err) {
      console.error(err)
    }
  }

  private setTagsViewTitle(title: string) {
    const tagView = this.tempTagView
    if (tagView) {
      tagView.title = `${title}-` // ${this.postForm.id}`
      TagsViewModule.updateVisitedView(tagView)
    }
  }

  private setPageTitle(title: string) {
    document.title = `${title} - `// ${this.postForm.id}`
  }

  private submitForm() {
    /* (this.$refs.postForm as Form).validate(valid => {
      if (valid) {
        this.loading = true
        this.$notify({
          title: 'Success',
          message: 'The post published successfully',
          type: 'success',
          duration: 2000
        })
        // this.postForm.status = 'published'
        // Just to simulate the time of the request
        setTimeout(() => {
          this.loading = false
        }, 0.5 * 1000)
      } else {
        console.error('Submit Error!')
        return false
      }
    }) */
    (this.$refs.postForm as Form).validate(async(valid) => {
      if (valid) {
        const linkData = this.postForm
        // articleData.id = Math.round(Math.random() * 100) + 1024 // mock a id
        // articleData.author = 'vue-typescript-admin'

        const submissionData = {
          name: linkData.name,
          description: linkData.description,
          amount: linkData.amount
        }

        const { data } = await createLink({ name: linkData.name, description: linkData.description, amount: linkData.amount })
        data.link.timestamp = Date.parse(data.link.timestamp)
        // this.list.unshift(data.article)
        // this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      }
    })
  }

  private async getRemoteUserList(name: string) {
    const { data } = await getUsers({ name })
    if (!data.items) return
    this.userListOptions = data.items.map((v: any) => v.name)
  }
}
</script>

<style lang="scss">
.article-textarea {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>

<style lang="scss" scoped>
.createLink-container {
  position: relative;

  .createLink-main-container {
    padding: 40px 45px 20px 50px;

    .linkInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .linkInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}
</style>
