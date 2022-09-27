const _ids = {
    green:{
        advertisement: '6328c4fd9ef93a12f6129871',
        agriculture: '6328c4fd9ef93a12f6129873'
    }
}
const green_advertisement = [
    {word: 'provide', meaning: '', parent: _ids.green.agriculture},
    {word: 'product', meaning: 'منتج', parent: _ids.green.agriculture},
    {word: 'posted', meaning: 'نشر', parent: _ids.green.agriculture},
    {word: 'quality', meaning: 'تجاري، اعلان تجاري', parent: _ids.green.agriculture},
    {word: 'commercial', meaning: 'عرض، إظهار', parent: _ids.green.agriculture},
    {word: 'display', meaning: 'عرض، اظهار', parent: _ids.green.agriculture},
    {word: 'marketed', meaning: 'يُسوِّق', parent: _ids.green.agriculture},
    {word: 'promote', meaning: 'يروج، يشجّع، يطوّر', parent: _ids.green.agriculture},
    {word: 'communicate', meaning: 'ينقل، يتواصل', parent: _ids.green.agriculture},
    {word: 'media', meaning: 'وسائل الاعلام', parent: _ids.green.agriculture},
    {word: 'version', meaning: 'اصدار، صيغة', parent: _ids.green.agriculture},
    {word: 'editor', meaning: 'محرّر', parent: _ids.green.agriculture},
    {word: 'exposed', meaning: 'كَشَف', parent: _ids.green.agriculture},
    {word: 'guide', meaning: 'مرشد، دليل', parent: _ids.green.agriculture},
    {word: 'persuade', meaning: 'يقنع', parent: _ids.green.agriculture},
    {word: 'logo', meaning: 'شعار', parent: _ids.green.agriculture},
    {word: 'aim', meaning: 'هدف', parent: _ids.green.agriculture},
    {word: 'campaign', meaning: 'حملة', parent: _ids.green.agriculture},
    {word: 'phrase', meaning: 'عبارة', parent: _ids.green.agriculture},
    {word: 'granted', meaning: 'اكيد، موهوب، ممنوح', parent: _ids.green.agriculture},
    {word: 'trademark', meaning: 'علامة تجارية', parent: _ids.green.agriculture},
    {word: 'exclusive', meaning: 'حصري، باستثناء، مقصور', parent: _ids.green.agriculture},
    {word: 'publisher', meaning: 'الناشر', parent: _ids.green.agriculture},
    {word: 'announce', meaning: 'يعلن', parent: _ids.green.agriculture},
    {word: 'revision', meaning: 'مراجعة، تنقيح', parent: _ids.green.agriculture},
    {word: 'proclaim', meaning: 'يعلن، نشر، صرّح', parent: _ids.green.agriculture},
]

const green_agriculture = [
    {word: 'flower', meaning: 'زهرة', parent: _ids.green.agriculture},
    {word: 'season', meaning: 'موسم / يبهّر', parent: _ids.green.agriculture},
    {word: 'field', meaning: 'حقل / ميدان /مجال', parent: _ids.green.agriculture},
    {word: 'crop', meaning: 'يقصّ / محصول', parent: _ids.green.agriculture},
    {word: 'grains', meaning: 'حبوب / بقوليات', parent: _ids.green.agriculture},
    {word: 'absorb', meaning: 'يمتصّ / يستوعب', parent: _ids.green.agriculture},
    {word: 'seed', meaning: 'بذرة', parent: _ids.green.agriculture},
    {word: 'drought', meaning: 'جفاف / قحط', parent: _ids.green.agriculture},
    {word: 'abundant', meaning: 'وافر', parent: _ids.green.agriculture},
    {word: 'yield', meaning: 'يخضع / يستسلم / محصول / دخل', parent: _ids.green.agriculture},
    {word: 'cultivate', meaning: 'يزرع / يفلح / يحرث', parent: _ids.green.agriculture},
    {word: 'soil', meaning: 'تربة', parent: _ids.green.agriculture},
    {word: 'tract', meaning: 'قطعة ارض / مسالك', parent: _ids.green.agriculture},
    {word: 'genus', meaning: 'جنس / صنف', parent: _ids.green.agriculture},
]

module.exports = green_agriculture