﻿//------------------------------------------------------------------------------
// <auto-generated>
//     此代码由工具生成。
//     运行时版本:4.0.30319.42000
//
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
//------------------------------------------------------------------------------

namespace luntuo.ServiceReference2 {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="ServiceReference2.LTPCwebserviceSoap")]
    public interface LTPCwebserviceSoap {
        
        // CODEGEN: 消息 DddxqfjRequest 以后生成的消息协定具有标头
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/Dddxqfj", ReplyAction="*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults=true)]
        luntuo.ServiceReference2.DddxqfjResponse Dddxqfj(luntuo.ServiceReference2.DddxqfjRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/Dddxqfj", ReplyAction="*")]
        System.Threading.Tasks.Task<luntuo.ServiceReference2.DddxqfjResponse> DddxqfjAsync(luntuo.ServiceReference2.DddxqfjRequest request);
        
        // CODEGEN: 消息 CgxufjRequest 以后生成的消息协定具有标头
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/Cgxufj", ReplyAction="*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults=true)]
        luntuo.ServiceReference2.CgxufjResponse Cgxufj(luntuo.ServiceReference2.CgxufjRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/Cgxufj", ReplyAction="*")]
        System.Threading.Tasks.Task<luntuo.ServiceReference2.CgxufjResponse> CgxufjAsync(luntuo.ServiceReference2.CgxufjRequest request);
        
        // CODEGEN: 消息 BjxufjRequest 以后生成的消息协定具有标头
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/Bjxufj", ReplyAction="*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults=true)]
        luntuo.ServiceReference2.BjxufjResponse Bjxufj(luntuo.ServiceReference2.BjxufjRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/Bjxufj", ReplyAction="*")]
        System.Threading.Tasks.Task<luntuo.ServiceReference2.BjxufjResponse> BjxufjAsync(luntuo.ServiceReference2.BjxufjRequest request);
        
        // CODEGEN: 消息 JjxufjRequest 以后生成的消息协定具有标头
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/Jjxufj", ReplyAction="*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults=true)]
        luntuo.ServiceReference2.JjxufjResponse Jjxufj(luntuo.ServiceReference2.JjxufjRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/Jjxufj", ReplyAction="*")]
        System.Threading.Tasks.Task<luntuo.ServiceReference2.JjxufjResponse> JjxufjAsync(luntuo.ServiceReference2.JjxufjRequest request);
        
        // CODEGEN: 消息 ChkSapRequest 以后生成的消息协定具有标头
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ChkSap", ReplyAction="*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults=true)]
        luntuo.ServiceReference2.ChkSapResponse ChkSap(luntuo.ServiceReference2.ChkSapRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ChkSap", ReplyAction="*")]
        System.Threading.Tasks.Task<luntuo.ServiceReference2.ChkSapResponse> ChkSapAsync(luntuo.ServiceReference2.ChkSapRequest request);
        
        // CODEGEN: 消息 GetKcRequest 以后生成的消息协定具有标头
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/GetKc", ReplyAction="*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults=true)]
        luntuo.ServiceReference2.GetKcResponse GetKc(luntuo.ServiceReference2.GetKcRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/GetKc", ReplyAction="*")]
        System.Threading.Tasks.Task<luntuo.ServiceReference2.GetKcResponse> GetKcAsync(luntuo.ServiceReference2.GetKcRequest request);
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.8.4084.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://tempuri.org/")]
    public partial class MySoapHeader : object, System.ComponentModel.INotifyPropertyChanged {
        
        private string userNameField;
        
        private string passWordField;
        
        private System.Xml.XmlAttribute[] anyAttrField;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=0)]
        public string UserName {
            get {
                return this.userNameField;
            }
            set {
                this.userNameField = value;
                this.RaisePropertyChanged("UserName");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=1)]
        public string PassWord {
            get {
                return this.passWordField;
            }
            set {
                this.passWordField = value;
                this.RaisePropertyChanged("PassWord");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlAnyAttributeAttribute()]
        public System.Xml.XmlAttribute[] AnyAttr {
            get {
                return this.anyAttrField;
            }
            set {
                this.anyAttrField = value;
                this.RaisePropertyChanged("AnyAttr");
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="Dddxqfj", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class DddxqfjRequest {
        
        [System.ServiceModel.MessageHeaderAttribute(Namespace="http://tempuri.org/")]
        public luntuo.ServiceReference2.MySoapHeader MySoapHeader;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public string strDate;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=1)]
        public int iDID;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=2)]
        public string strType;
        
        public DddxqfjRequest() {
        }
        
        public DddxqfjRequest(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strDate, int iDID, string strType) {
            this.MySoapHeader = MySoapHeader;
            this.strDate = strDate;
            this.iDID = iDID;
            this.strType = strType;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="DddxqfjResponse", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class DddxqfjResponse {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public int DddxqfjResult;
        
        public DddxqfjResponse() {
        }
        
        public DddxqfjResponse(int DddxqfjResult) {
            this.DddxqfjResult = DddxqfjResult;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="Cgxufj", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class CgxufjRequest {
        
        [System.ServiceModel.MessageHeaderAttribute(Namespace="http://tempuri.org/")]
        public luntuo.ServiceReference2.MySoapHeader MySoapHeader;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public string strDate;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=1)]
        public string strUserCode;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=2)]
        public int iDID;
        
        public CgxufjRequest() {
        }
        
        public CgxufjRequest(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strDate, string strUserCode, int iDID) {
            this.MySoapHeader = MySoapHeader;
            this.strDate = strDate;
            this.strUserCode = strUserCode;
            this.iDID = iDID;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="CgxufjResponse", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class CgxufjResponse {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public bool CgxufjResult;
        
        public CgxufjResponse() {
        }
        
        public CgxufjResponse(bool CgxufjResult) {
            this.CgxufjResult = CgxufjResult;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="Bjxufj", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class BjxufjRequest {
        
        [System.ServiceModel.MessageHeaderAttribute(Namespace="http://tempuri.org/")]
        public luntuo.ServiceReference2.MySoapHeader MySoapHeader;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public string strUserCode;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=1)]
        public int iDID;
        
        public BjxufjRequest() {
        }
        
        public BjxufjRequest(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strUserCode, int iDID) {
            this.MySoapHeader = MySoapHeader;
            this.strUserCode = strUserCode;
            this.iDID = iDID;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="BjxufjResponse", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class BjxufjResponse {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public bool BjxufjResult;
        
        public BjxufjResponse() {
        }
        
        public BjxufjResponse(bool BjxufjResult) {
            this.BjxufjResult = BjxufjResult;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="Jjxufj", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class JjxufjRequest {
        
        [System.ServiceModel.MessageHeaderAttribute(Namespace="http://tempuri.org/")]
        public luntuo.ServiceReference2.MySoapHeader MySoapHeader;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public string strUserCode;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=1)]
        public int iDID;
        
        public JjxufjRequest() {
        }
        
        public JjxufjRequest(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strUserCode, int iDID) {
            this.MySoapHeader = MySoapHeader;
            this.strUserCode = strUserCode;
            this.iDID = iDID;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="JjxufjResponse", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class JjxufjResponse {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public bool JjxufjResult;
        
        public JjxufjResponse() {
        }
        
        public JjxufjResponse(bool JjxufjResult) {
            this.JjxufjResult = JjxufjResult;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="ChkSap", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class ChkSapRequest {
        
        [System.ServiceModel.MessageHeaderAttribute(Namespace="http://tempuri.org/")]
        public luntuo.ServiceReference2.MySoapHeader MySoapHeader;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public string strType;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=1)]
        public string strUserCode;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=2)]
        public int iDID;
        
        public ChkSapRequest() {
        }
        
        public ChkSapRequest(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strType, string strUserCode, int iDID) {
            this.MySoapHeader = MySoapHeader;
            this.strType = strType;
            this.strUserCode = strUserCode;
            this.iDID = iDID;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="ChkSapResponse", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class ChkSapResponse {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public string ChkSapResult;
        
        public ChkSapResponse() {
        }
        
        public ChkSapResponse(string ChkSapResult) {
            this.ChkSapResult = ChkSapResult;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="GetKc", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class GetKcRequest {
        
        [System.ServiceModel.MessageHeaderAttribute(Namespace="http://tempuri.org/")]
        public luntuo.ServiceReference2.MySoapHeader MySoapHeader;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public string strKcDate;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=1)]
        public string strUserCode;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=2)]
        public string iDID;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=3)]
        public string strDateB;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=4)]
        public string strDateE;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=5)]
        public string strSeries;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=6)]
        public string strMrp;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=7)]
        public string strMatnr;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=8)]
        public string strLifnr;
        
        public GetKcRequest() {
        }
        
        public GetKcRequest(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strKcDate, string strUserCode, string iDID, string strDateB, string strDateE, string strSeries, string strMrp, string strMatnr, string strLifnr) {
            this.MySoapHeader = MySoapHeader;
            this.strKcDate = strKcDate;
            this.strUserCode = strUserCode;
            this.iDID = iDID;
            this.strDateB = strDateB;
            this.strDateE = strDateE;
            this.strSeries = strSeries;
            this.strMrp = strMrp;
            this.strMatnr = strMatnr;
            this.strLifnr = strLifnr;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="GetKcResponse", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class GetKcResponse {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public string GetKcResult;
        
        public GetKcResponse() {
        }
        
        public GetKcResponse(string GetKcResult) {
            this.GetKcResult = GetKcResult;
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface LTPCwebserviceSoapChannel : luntuo.ServiceReference2.LTPCwebserviceSoap, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class LTPCwebserviceSoapClient : System.ServiceModel.ClientBase<luntuo.ServiceReference2.LTPCwebserviceSoap>, luntuo.ServiceReference2.LTPCwebserviceSoap {
        
        public LTPCwebserviceSoapClient() {
        }
        
        public LTPCwebserviceSoapClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public LTPCwebserviceSoapClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public LTPCwebserviceSoapClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public LTPCwebserviceSoapClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        luntuo.ServiceReference2.DddxqfjResponse luntuo.ServiceReference2.LTPCwebserviceSoap.Dddxqfj(luntuo.ServiceReference2.DddxqfjRequest request) {
            return base.Channel.Dddxqfj(request);
        }
        
        public int Dddxqfj(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strDate, int iDID, string strType) {
            luntuo.ServiceReference2.DddxqfjRequest inValue = new luntuo.ServiceReference2.DddxqfjRequest();
            inValue.MySoapHeader = MySoapHeader;
            inValue.strDate = strDate;
            inValue.iDID = iDID;
            inValue.strType = strType;
            luntuo.ServiceReference2.DddxqfjResponse retVal = ((luntuo.ServiceReference2.LTPCwebserviceSoap)(this)).Dddxqfj(inValue);
            return retVal.DddxqfjResult;
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<luntuo.ServiceReference2.DddxqfjResponse> luntuo.ServiceReference2.LTPCwebserviceSoap.DddxqfjAsync(luntuo.ServiceReference2.DddxqfjRequest request) {
            return base.Channel.DddxqfjAsync(request);
        }
        
        public System.Threading.Tasks.Task<luntuo.ServiceReference2.DddxqfjResponse> DddxqfjAsync(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strDate, int iDID, string strType) {
            luntuo.ServiceReference2.DddxqfjRequest inValue = new luntuo.ServiceReference2.DddxqfjRequest();
            inValue.MySoapHeader = MySoapHeader;
            inValue.strDate = strDate;
            inValue.iDID = iDID;
            inValue.strType = strType;
            return ((luntuo.ServiceReference2.LTPCwebserviceSoap)(this)).DddxqfjAsync(inValue);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        luntuo.ServiceReference2.CgxufjResponse luntuo.ServiceReference2.LTPCwebserviceSoap.Cgxufj(luntuo.ServiceReference2.CgxufjRequest request) {
            return base.Channel.Cgxufj(request);
        }
        
        public bool Cgxufj(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strDate, string strUserCode, int iDID) {
            luntuo.ServiceReference2.CgxufjRequest inValue = new luntuo.ServiceReference2.CgxufjRequest();
            inValue.MySoapHeader = MySoapHeader;
            inValue.strDate = strDate;
            inValue.strUserCode = strUserCode;
            inValue.iDID = iDID;
            luntuo.ServiceReference2.CgxufjResponse retVal = ((luntuo.ServiceReference2.LTPCwebserviceSoap)(this)).Cgxufj(inValue);
            return retVal.CgxufjResult;
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<luntuo.ServiceReference2.CgxufjResponse> luntuo.ServiceReference2.LTPCwebserviceSoap.CgxufjAsync(luntuo.ServiceReference2.CgxufjRequest request) {
            return base.Channel.CgxufjAsync(request);
        }
        
        public System.Threading.Tasks.Task<luntuo.ServiceReference2.CgxufjResponse> CgxufjAsync(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strDate, string strUserCode, int iDID) {
            luntuo.ServiceReference2.CgxufjRequest inValue = new luntuo.ServiceReference2.CgxufjRequest();
            inValue.MySoapHeader = MySoapHeader;
            inValue.strDate = strDate;
            inValue.strUserCode = strUserCode;
            inValue.iDID = iDID;
            return ((luntuo.ServiceReference2.LTPCwebserviceSoap)(this)).CgxufjAsync(inValue);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        luntuo.ServiceReference2.BjxufjResponse luntuo.ServiceReference2.LTPCwebserviceSoap.Bjxufj(luntuo.ServiceReference2.BjxufjRequest request) {
            return base.Channel.Bjxufj(request);
        }
        
        public bool Bjxufj(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strUserCode, int iDID) {
            luntuo.ServiceReference2.BjxufjRequest inValue = new luntuo.ServiceReference2.BjxufjRequest();
            inValue.MySoapHeader = MySoapHeader;
            inValue.strUserCode = strUserCode;
            inValue.iDID = iDID;
            luntuo.ServiceReference2.BjxufjResponse retVal = ((luntuo.ServiceReference2.LTPCwebserviceSoap)(this)).Bjxufj(inValue);
            return retVal.BjxufjResult;
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<luntuo.ServiceReference2.BjxufjResponse> luntuo.ServiceReference2.LTPCwebserviceSoap.BjxufjAsync(luntuo.ServiceReference2.BjxufjRequest request) {
            return base.Channel.BjxufjAsync(request);
        }
        
        public System.Threading.Tasks.Task<luntuo.ServiceReference2.BjxufjResponse> BjxufjAsync(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strUserCode, int iDID) {
            luntuo.ServiceReference2.BjxufjRequest inValue = new luntuo.ServiceReference2.BjxufjRequest();
            inValue.MySoapHeader = MySoapHeader;
            inValue.strUserCode = strUserCode;
            inValue.iDID = iDID;
            return ((luntuo.ServiceReference2.LTPCwebserviceSoap)(this)).BjxufjAsync(inValue);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        luntuo.ServiceReference2.JjxufjResponse luntuo.ServiceReference2.LTPCwebserviceSoap.Jjxufj(luntuo.ServiceReference2.JjxufjRequest request) {
            return base.Channel.Jjxufj(request);
        }
        
        public bool Jjxufj(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strUserCode, int iDID) {
            luntuo.ServiceReference2.JjxufjRequest inValue = new luntuo.ServiceReference2.JjxufjRequest();
            inValue.MySoapHeader = MySoapHeader;
            inValue.strUserCode = strUserCode;
            inValue.iDID = iDID;
            luntuo.ServiceReference2.JjxufjResponse retVal = ((luntuo.ServiceReference2.LTPCwebserviceSoap)(this)).Jjxufj(inValue);
            return retVal.JjxufjResult;
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<luntuo.ServiceReference2.JjxufjResponse> luntuo.ServiceReference2.LTPCwebserviceSoap.JjxufjAsync(luntuo.ServiceReference2.JjxufjRequest request) {
            return base.Channel.JjxufjAsync(request);
        }
        
        public System.Threading.Tasks.Task<luntuo.ServiceReference2.JjxufjResponse> JjxufjAsync(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strUserCode, int iDID) {
            luntuo.ServiceReference2.JjxufjRequest inValue = new luntuo.ServiceReference2.JjxufjRequest();
            inValue.MySoapHeader = MySoapHeader;
            inValue.strUserCode = strUserCode;
            inValue.iDID = iDID;
            return ((luntuo.ServiceReference2.LTPCwebserviceSoap)(this)).JjxufjAsync(inValue);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        luntuo.ServiceReference2.ChkSapResponse luntuo.ServiceReference2.LTPCwebserviceSoap.ChkSap(luntuo.ServiceReference2.ChkSapRequest request) {
            return base.Channel.ChkSap(request);
        }
        
        public string ChkSap(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strType, string strUserCode, int iDID) {
            luntuo.ServiceReference2.ChkSapRequest inValue = new luntuo.ServiceReference2.ChkSapRequest();
            inValue.MySoapHeader = MySoapHeader;
            inValue.strType = strType;
            inValue.strUserCode = strUserCode;
            inValue.iDID = iDID;
            luntuo.ServiceReference2.ChkSapResponse retVal = ((luntuo.ServiceReference2.LTPCwebserviceSoap)(this)).ChkSap(inValue);
            return retVal.ChkSapResult;
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<luntuo.ServiceReference2.ChkSapResponse> luntuo.ServiceReference2.LTPCwebserviceSoap.ChkSapAsync(luntuo.ServiceReference2.ChkSapRequest request) {
            return base.Channel.ChkSapAsync(request);
        }
        
        public System.Threading.Tasks.Task<luntuo.ServiceReference2.ChkSapResponse> ChkSapAsync(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strType, string strUserCode, int iDID) {
            luntuo.ServiceReference2.ChkSapRequest inValue = new luntuo.ServiceReference2.ChkSapRequest();
            inValue.MySoapHeader = MySoapHeader;
            inValue.strType = strType;
            inValue.strUserCode = strUserCode;
            inValue.iDID = iDID;
            return ((luntuo.ServiceReference2.LTPCwebserviceSoap)(this)).ChkSapAsync(inValue);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        luntuo.ServiceReference2.GetKcResponse luntuo.ServiceReference2.LTPCwebserviceSoap.GetKc(luntuo.ServiceReference2.GetKcRequest request) {
            return base.Channel.GetKc(request);
        }
        
        public string GetKc(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strKcDate, string strUserCode, string iDID, string strDateB, string strDateE, string strSeries, string strMrp, string strMatnr, string strLifnr) {
            luntuo.ServiceReference2.GetKcRequest inValue = new luntuo.ServiceReference2.GetKcRequest();
            inValue.MySoapHeader = MySoapHeader;
            inValue.strKcDate = strKcDate;
            inValue.strUserCode = strUserCode;
            inValue.iDID = iDID;
            inValue.strDateB = strDateB;
            inValue.strDateE = strDateE;
            inValue.strSeries = strSeries;
            inValue.strMrp = strMrp;
            inValue.strMatnr = strMatnr;
            inValue.strLifnr = strLifnr;
            luntuo.ServiceReference2.GetKcResponse retVal = ((luntuo.ServiceReference2.LTPCwebserviceSoap)(this)).GetKc(inValue);
            return retVal.GetKcResult;
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<luntuo.ServiceReference2.GetKcResponse> luntuo.ServiceReference2.LTPCwebserviceSoap.GetKcAsync(luntuo.ServiceReference2.GetKcRequest request) {
            return base.Channel.GetKcAsync(request);
        }
        
        public System.Threading.Tasks.Task<luntuo.ServiceReference2.GetKcResponse> GetKcAsync(luntuo.ServiceReference2.MySoapHeader MySoapHeader, string strKcDate, string strUserCode, string iDID, string strDateB, string strDateE, string strSeries, string strMrp, string strMatnr, string strLifnr) {
            luntuo.ServiceReference2.GetKcRequest inValue = new luntuo.ServiceReference2.GetKcRequest();
            inValue.MySoapHeader = MySoapHeader;
            inValue.strKcDate = strKcDate;
            inValue.strUserCode = strUserCode;
            inValue.iDID = iDID;
            inValue.strDateB = strDateB;
            inValue.strDateE = strDateE;
            inValue.strSeries = strSeries;
            inValue.strMrp = strMrp;
            inValue.strMatnr = strMatnr;
            inValue.strLifnr = strLifnr;
            return ((luntuo.ServiceReference2.LTPCwebserviceSoap)(this)).GetKcAsync(inValue);
        }
    }
}
