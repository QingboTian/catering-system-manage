<template>
    <div>
        <el-upload
        class="upload-demo"
            :action="action"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="OnSuccess"
            :on-progress="OnProgress"
            multiple
            :limit="limit"
            :on-exceed="handleExceed"
            :file-list="fileList"
            with-credentials
            drag
        >
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        action: {
            type: String,
            require: true
        },
        fileList: {
            type: Array,
            default: []
        },
        limit: {
            type: Number,
            default: 1
        },
        multiple: {
            true: Boolean,
            default: true
        },
        name: {
            type: String,
            default: 'file'
        }
    },
    methods: {
        OnProgress(event, file, fileList) {
            this.$message('文件上传中');
        },
        OnSuccess(response, file, fileList) {
            this.$emit('OnSuccess', response, file, fileList);
        },
        handleRemove(file, fileList) {
            this.$emit('handleRemove', file, fileList);
        },
        handlePreview(file) {
            this.$emit('handlePreview', file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        }
    }
};
</script>

<style scoped>
</style>