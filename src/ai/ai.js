import DeepSeekAI from '@/ai/deepseek.js'
import OllamakAI from '@/ai/ollama.js'
import QwenAI from '@/ai/qwen.js'
import VolcAI from '@/ai/volc.js'
import SiliconFlowAI from '@/ai/siliconflow.js'
import RecordApi from '@/api/record.js'

class AI {
  static bugMsg = '好像有只bug在开派对？请检查配置信息后重试~'
  static ais = {
    deepseek: DeepSeekAI,
    ollama: OllamakAI,
    qwen: QwenAI,
    volc: VolcAI,
    siliconflow: SiliconFlowAI
  }

  static async getResponseContent(roleCharacter, modelContent, message, keyInfo, context) {
    //根据key获取上下文
    if (!context) {
      let result = await RecordApi.context({ produceId: keyInfo.produceId, targetKey: keyInfo.targetKey, num: 15 })
      context = result.data
    }
    const ai = AI.ais[modelContent.type]
    if (ai) {
      return await AI.ais[modelContent.type].getResponseContent(roleCharacter, modelContent, context, message)
    } else {
      return 'ta好像迷路了，请稍后重试吧'
    }
  }
}

export default AI
