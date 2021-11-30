export const bug_report_str = ({
                                 // @ts-ignore
                                 description,
                                 // @ts-ignore
                                 StepsToReproduce,
                                 // @ts-ignore
                                 DesiredResult,
                                 // @ts-ignore
                                 ReproduceLink,
                                 // @ts-ignore
                                 ReactVersion,
                                 // @ts-ignore
                                 ReactVantVersion,
                                 // @ts-ignore
                                 other,
                                 // @ts-ignore
                                 Device
                               } ) => {
  return encodeURIComponent(`
### 🐛 漏洞描述 (Bug description)

${description}

### 🐾 复现步骤 (Steps to reproduce)

${StepsToReproduce}

### 🌈 想要的结果 (Desired result)

${DesiredResult}

### 💻 复现示例 (Reproduce the code)

${ReproduceLink}

### 📦 环境信息 (Environmental information)

- Device: ${Device.split('/')[0]}
- OS: ${Device.split('/')[1]}
- Browser: ${Device.split('/')[2]}
- Version :
  - React: ${ReactVersion}
  - React-Vant: ${ReactVantVersion}

### 🔖 其他 (Other)

${other}

    `).replace(/%2B/gi, '+')

}
