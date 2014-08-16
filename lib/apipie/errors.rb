module Apipie

  module RescueError

    def self.included(base)
      base.rescue_from Apipie::Error do |e|
        # render "public/404", :status => 404
        respond_to do |format|
          format.html { render :show, status: @status_code, layout: !request.xhr? }
          format.xml  { render xml: e, root: "error", status: 400 }
          format.json { render json: {error: e.to_s}, status: 400 }
        end
      end
    end

  end


  class Error < StandardError
  end

  class ParamError < Error
  end

  # abstract
  class DefinedParamError < ParamError
    attr_accessor :param

    def initialize(param)
      @param = param
    end
  end

  class ParamMissing < DefinedParamError
    def to_s
      "Missing parameter #{@param}"
    end
  end

  class ParamInvalid < DefinedParamError
    attr_accessor :value, :error

    def initialize(param, value, error)
      super param
      @value = value
      @error = error
    end

    def to_s
      "Invalid parameter '#{@param}' value #{@value.inspect}: #{@error}"
    end
  end

end
